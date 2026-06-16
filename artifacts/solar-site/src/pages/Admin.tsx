import { useEffect, useState } from "react";

type AnyObject = Record<string, any>;

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

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<AnyObject | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [uploadingPath, setUploadingPath] = useState<string | null>(null);

  useEffect(() => {
    fetch("/site-content.json?v=" + Date.now())
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setActiveTab(Object.keys(data)[0] || "hero");
      })
      .catch(() => alert("Erro ao carregar conteúdo"));
  }, []);

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
    } else {
      alert("Senha incorreta");
    }
  }

  async function save() {
    setSaving(true);

    const response = await fetch("/api/admin-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "save",
        password,
        content,
      }),
    });

    const data = await response.json();
    setSaving(false);

    if (data.success) {
      alert("Conteúdo salvo. Aguarde o redeploy da Vercel.");
    } else {
      alert(data.message || "Erro ao salvar");
    }
  }

  function updateValue(path: string[], value: any) {
    if (!content) return;

    const updated = structuredClone(content);
    let current = updated;

    path.slice(0, -1).forEach((key) => {
      current = Array.isArray(current) ? current[Number(key)] : current[key];
    });

    const last = path[path.length - 1];

    if (Array.isArray(current)) {
      current[Number(last)] = value;
    } else {
      current[last] = value;
    }

    setContent(updated);
  }

  function addItem(path: string[], template: any) {
    if (!content) return;

    const updated = structuredClone(content);
    let current = updated;

    path.forEach((key) => {
      current = Array.isArray(current) ? current[Number(key)] : current[key];
    });

    if (Array.isArray(current)) {
      current.push(template);
    }

    setContent(updated);
  }

  function removeItem(path: string[], index: number) {
    if (!content) return;

    const updated = structuredClone(content);
    let current = updated;

    path.forEach((key) => {
      current = Array.isArray(current) ? current[Number(key)] : current[key];
    });

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

  async function uploadImage(path: string[], file: File) {
    const pathKey = path.join(".");
    setUploadingPath(pathKey);

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const response = await fetch("/api/admin-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            fileName: file.name,
            fileBase64: reader.result,
          }),
        });

        const data = await response.json();

        if (data.success) {
          updateValue(path, data.path);
          alert("Imagem enviada com sucesso. Clique em Salvar Alterações.");
        } else {
          alert(data.message || "Erro ao enviar imagem");
        }
      } catch {
        alert("Erro ao enviar imagem");
      } finally {
        setUploadingPath(null);
      }
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

      return (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 capitalize">
            {label}
          </label>

          {imageField && (
            <p className="text-xs text-slate-500 mb-2">
              Para imagens, use caminho como <strong>/gallery-1.png</strong> ou
              URL completa. Também pode enviar uma imagem abaixo.
            </p>
          )}

          {imageField && (
            <label className="inline-flex items-center justify-center w-full md:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-5 py-3 rounded-xl mb-3 transition-colors">
              {isUploading ? "Enviando imagem..." : "Upload de Imagem"}
          
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

          {isUploading && (
            <p className="text-sm text-primary font-bold mb-3">
              Enviando imagem...
            </p>
          )}

          {isLong ? (
            <textarea
              value={value}
              onChange={(e) => updateValue(path, e.target.value)}
              className="w-full border rounded-lg p-3 min-h-[120px]"
            />
          ) : (
            <input
              value={value}
              onChange={(e) => updateValue(path, e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          )}

          {imageField && value && (
            <img
              src={value}
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
        <div className="bg-white rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-black mb-6">Admin WM Soluções</h1>

          <input
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <button
            onClick={login}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg"
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Carregando...
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
              Edite textos e caminhos das imagens do site.
            </p>
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
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
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl disabled:opacity-60 mt-6"
        >
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </main>
  );
}
