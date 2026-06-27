import { useEffect, useMemo, useState } from "react";

type AnyObject = Record<string, any>;
type PendingUpload = {
  id: string;
  path: string[];
  fileName: string;
  fileBase64: string;
};

type ChangeItem = {
  path: string;
  before: string;
  after: string;
};

const PENDING_IMAGE_PREFIX = "__pending_upload__:";

const labels: Record<string, string> = {
  brand: "Marca",
  seo: "SEO",
  contact: "Contato",
  navbar: "Menu",
  hero: "Topo",
  numbers: "Contadores",
  services: "Soluções",
  offer: "Oferta",
  benefits: "Benefícios",
  about: "Quem Somos",
  howItWorks: "Como Funciona",
  gallery: "Nossos Trabalhos",
  testimonials: "Depoimentos",
  faq: "FAQ",
  contactSection: "Contato CTA",
  footer: "Rodapé",
  legal: "Termos e Privacidade",
};

function getValueAtPath(source: any, path: string[]) {
  return path.reduce((current, key) => {
    if (current == null) return undefined;
    return Array.isArray(current) ? current[Number(key)] : current[key];
  }, source);
}

function setValueAtPath(source: any, path: string[], value: any) {
  let current = source;

  path.slice(0, -1).forEach((key) => {
    current = Array.isArray(current) ? current[Number(key)] : current[key];
  });

  const last = path[path.length - 1];

  if (Array.isArray(current)) {
    current[Number(last)] = value;
  } else {
    current[last] = value;
  }
}

function formatValue(value: any) {
  if (typeof value === "string" && value.startsWith(PENDING_IMAGE_PREFIX)) {
    return "Imagem pendente para envio";
  }

  if (typeof value === "string") {
    return value.length > 80 ? `${value.slice(0, 80)}...` : value;
  }

  if (value === undefined) return "Campo novo";
  if (value === null) return "Vazio";

  return JSON.stringify(value).slice(0, 80);
}

function collectChanges(before: any, after: any, basePath: string[] = []): ChangeItem[] {
  if (JSON.stringify(before) === JSON.stringify(after)) return [];

  const beforeIsObject = before && typeof before === "object";
  const afterIsObject = after && typeof after === "object";

  if (!beforeIsObject || !afterIsObject || Array.isArray(before) !== Array.isArray(after)) {
    return [
      {
        path: basePath.join(".") || "conteúdo",
        before: formatValue(before),
        after: formatValue(after),
      },
    ];
  }

  const keys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})]);
  const changes: ChangeItem[] = [];

  keys.forEach((key) => {
    changes.push(...collectChanges(before?.[key], after?.[key], [...basePath, key]));
  });

  return changes;
}

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<AnyObject | null>(null);
  const [originalContent, setOriginalContent] = useState<AnyObject | null>(null);
  const [baseSha, setBaseSha] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [uploadingPath, setUploadingPath] = useState<string | null>(null);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});

  const changes = useMemo(() => {
    if (!originalContent || !content) return [];
    return collectChanges(originalContent, content);
  }, [originalContent, content]);

  const hasPendingChanges = changes.length > 0 || pendingUploads.length > 0;

  async function loadContent(adminPassword = password) {
    setLoadingContent(true);

    try {
      const response = await fetch("/api/admin-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "load", password: adminPassword }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Erro ao carregar conteúdo");
        return;
      }

      setContent(data.content);
      setOriginalContent(structuredClone(data.content));
      setBaseSha(data.sha || "");
      setActiveTab(Object.keys(data.content)[0] || "hero");
      setPendingUploads([]);
      setImagePreviews({});
    } catch {
      alert("Erro ao carregar conteúdo");
    } finally {
      setLoadingContent(false);
    }
  }

  useEffect(() => {
    if (authorized && !content && !loadingContent) {
      loadContent();
    }
  }, [authorized]);

  async function login() {
    const response = await fetch("/api/admin-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "login", password }),
    });

    const data = await response.json();

    if (data.success) {
      setAuthorized(true);
      await loadContent(password);
    } else {
      alert("Senha incorreta");
    }
  }

  async function save() {
    if (!content) return;

    setSaving(true);

    try {
      const contentToSave = structuredClone(content);

      for (const upload of pendingUploads) {
        const response = await fetch("/api/admin-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            fileName: upload.fileName,
            fileBase64: upload.fileBase64,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Erro ao enviar imagem");
        }

        setValueAtPath(contentToSave, upload.path, data.path);
      }

      const response = await fetch("/api/admin-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "save",
          password,
          content: contentToSave,
          baseSha,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setContent(contentToSave);
        setOriginalContent(structuredClone(contentToSave));
        setBaseSha(data.sha || baseSha);
        setPendingUploads([]);
        setImagePreviews({});
        alert("Alterações salvas com sucesso. As imagens e textos só foram enviados agora após clicar em Salvar Alterações.");
      } else {
        if (data.stale && data.currentContent) {
          setContent(data.currentContent);
          setOriginalContent(structuredClone(data.currentContent));
          setBaseSha(data.currentSha || "");
          setPendingUploads([]);
          setImagePreviews({});
        }

        alert(data.message || "Erro ao salvar");
      }
    } catch (error: any) {
      alert(error.message || "Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  }

  function updateValue(path: string[], value: any) {
    if (!content) return;

    const updated = structuredClone(content);
    setValueAtPath(updated, path, value);
    setContent(updated);
  }

  function addItem(path: string[], template: any) {
    if (!content) return;

    const updated = structuredClone(content);
    const current = getValueAtPath(updated, path);

    if (Array.isArray(current)) {
      current.push(template);
    }

    setContent(updated);
  }

  function removeItem(path: string[], index: number) {
    if (!content) return;

    const updated = structuredClone(content);
    const current = getValueAtPath(updated, path);

    if (Array.isArray(current)) {
      current.splice(index, 1);
    }

    setContent(updated);
  }

  function cloneTemplate(value: any) {
    if (Array.isArray(value) && value.length > 0) {
      return structuredClone(value[0]);
    }

    return "";
  }

  function isImagePath(label: string) {
    return ["src", "image", "background", "logo", "favicon", "ogImage"].includes(
      label
    );
  }

  function previewSrc(value: string) {
    if (value.startsWith(PENDING_IMAGE_PREFIX)) {
      const id = value.replace(PENDING_IMAGE_PREFIX, "");
      return imagePreviews[id] || "";
    }

    return value;
  }

  async function uploadImage(path: string[], file: File) {
    const pathKey = path.join(".");
    setUploadingPath(pathKey);

    const reader = new FileReader();

    reader.onload = () => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const fileBase64 = String(reader.result || "");
      const pendingValue = `${PENDING_IMAGE_PREFIX}${id}`;

      setPendingUploads((current) => [
        ...current.filter((item) => item.path.join(".") !== pathKey),
        {
          id,
          path,
          fileName: file.name,
          fileBase64,
        },
      ]);

      setImagePreviews((current) => ({
        ...current,
        [id]: fileBase64,
      }));

      updateValue(path, pendingValue);
      setUploadingPath(null);
      alert("Imagem adicionada como alteração pendente. Ela só será enviada ao GitHub ao clicar em Salvar Alterações.");
    };

    reader.onerror = () => {
      setUploadingPath(null);
      alert("Erro ao preparar imagem");
    };

    reader.readAsDataURL(file);
  }

  function renderField(label: string, value: any, path: string[]) {
    if (Array.isArray(value)) {
      return (
        <div className="border rounded-xl p-4 mb-5 bg-slate-50">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-black text-lg capitalize">{label}</h3>

            <button
              onClick={() => addItem(path, cloneTemplate(value))}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              Adicionar
            </button>
          </div>

          {value.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold">Item {index + 1}</div>

                <button
                  onClick={() => removeItem(path, index)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                >
                  Remover
                </button>
              </div>

              {renderField(`${label} ${index + 1}`, item, [
                ...path,
                String(index),
              ])}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-black mb-5 capitalize">
            {labels[label] || label}
          </h2>

          {Object.entries(value).map(([key, val]) => (
            <div key={key}>{renderField(key, val, [...path, key])}</div>
          ))}
        </div>
      );
    }

    if (typeof value === "string") {
      const isLong = value.length > 80;
      const imageField = isImagePath(label);
      const pathKey = path.join(".");
      const isUploading = uploadingPath === pathKey;
      const displayValue = value.startsWith(PENDING_IMAGE_PREFIX)
        ? "Imagem pendente para envio ao salvar"
        : value;

      return (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 capitalize">
            {label}
          </label>

          {imageField && (
            <p className="text-xs text-slate-500 mb-2">
              A imagem fica em prévia local e só será enviada ao GitHub quando clicar em <strong>Salvar Alterações</strong>.
            </p>
          )}

          {imageField && (
            <label className="inline-flex items-center justify-center w-full md:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-5 py-3 rounded-xl mb-3 transition-colors">
              {isUploading ? "Preparando imagem..." : "Selecionar Imagem"}

              <input
                type="file"
                accept="image/*"
                disabled={isUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    uploadImage(path, file);
                  }

                  e.currentTarget.value = "";
                }}
                className="hidden"
              />
            </label>
          )}

          {isLong && !imageField ? (
            <textarea
              value={value}
              onChange={(e) => updateValue(path, e.target.value)}
              className="w-full border rounded-lg p-3 min-h-[120px]"
            />
          ) : (
            <input
              value={displayValue}
              onChange={(e) => updateValue(path, e.target.value)}
              readOnly={value.startsWith(PENDING_IMAGE_PREFIX)}
              className="w-full border rounded-lg p-3"
            />
          )}

          {imageField && previewSrc(value) && (
            <img
              src={previewSrc(value)}
              alt=""
              className="mt-3 max-h-28 rounded-lg border bg-slate-100 object-contain"
            />
          )}
        </div>
      );
    }

    if (typeof value === "number") {
      return (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 capitalize">
            {label}
          </label>

          <input
            type="number"
            value={value}
            onChange={(e) => updateValue(path, Number(e.target.value))}
            className="w-full border rounded-lg p-3"
          />
        </div>
      );
    }

    return null;
  }

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          className="bg-white rounded-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-black mb-6">Admin WM Soluções</h1>

          <input
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
            autoFocus
          />

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }

  if (loadingContent || !content) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Carregando conteúdo atual do GitHub...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black">Admin WM Soluções</h1>
            <p className="text-slate-600">
              Edite textos e imagens. Nada é enviado ao GitHub até clicar em Salvar Alterações.
            </p>
          </div>

          <button
            onClick={save}
            disabled={saving || !hasPendingChanges}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>

        <div className="grid xl:grid-cols-[240px_1fr_340px] lg:grid-cols-[240px_1fr] gap-6">
          <aside className="bg-white border rounded-2xl p-3 h-fit sticky top-4">
            {Object.keys(content).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm mb-1 ${
                  activeTab === key
                    ? "bg-primary text-white"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                {labels[key] || key}
              </button>
            ))}
          </aside>

          <section>
            {renderField(activeTab, content[activeTab], [activeTab])}
          </section>

          <aside className="bg-white border rounded-2xl p-5 h-fit sticky top-4 xl:block lg:col-span-2 xl:col-span-1">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-black">Alterações pendentes</h2>
                <p className="text-sm text-slate-500">
                  Prévia em tempo real do que ainda não foi enviado.
                </p>
              </div>
              <span className="bg-slate-900 text-white text-xs font-black rounded-full px-3 py-1">
                {changes.length}
              </span>
            </div>

            {!hasPendingChanges ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                Nenhuma alteração pendente. Edite algum campo para aparecer aqui.
              </div>
            ) : (
              <div className="space-y-3 max-h-[65vh] overflow-auto pr-1">
                {pendingUploads.map((upload) => (
                  <div key={upload.id} className="rounded-xl border bg-amber-50 border-amber-200 p-3">
                    <div className="text-xs font-black text-amber-700 uppercase">Imagem pendente</div>
                    <div className="text-sm font-bold text-slate-900 break-all">{upload.path.join(".")}</div>
                    <div className="text-xs text-slate-500 break-all">{upload.fileName}</div>
                    {imagePreviews[upload.id] && (
                      <img
                        src={imagePreviews[upload.id]}
                        alt=""
                        className="mt-2 max-h-24 w-full rounded-lg border bg-white object-contain"
                      />
                    )}
                  </div>
                ))}

                {changes.slice(0, 80).map((change, index) => (
                  <div key={`${change.path}-${index}`} className="rounded-xl border bg-slate-50 p-3">
                    <div className="text-sm font-black text-slate-900 break-all">{change.path}</div>
                    <div className="mt-2 grid gap-1 text-xs">
                      <div>
                        <span className="font-bold text-red-600">Antes:</span>{" "}
                        <span className="text-slate-600 break-all">{change.before}</span>
                      </div>
                      <div>
                        <span className="font-bold text-green-700">Agora:</span>{" "}
                        <span className="text-slate-800 break-all">{change.after}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={save}
              disabled={saving || !hasPendingChanges}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-4 rounded-xl disabled:opacity-60 mt-5"
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
