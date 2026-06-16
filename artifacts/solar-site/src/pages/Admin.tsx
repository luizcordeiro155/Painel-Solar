import { useEffect, useState } from "react";

type AnyObject = Record<string, any>;

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<AnyObject | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/site-content.json?v=" + Date.now())
      .then((res) => res.json())
      .then(setContent)
      .catch(() => alert("Erro ao carregar conteúdo"));
  }, []);

  async function login() {
    const response = await fetch("/api/admin-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save", password, content }),
    });

    const data = await response.json();
    setSaving(false);

    if (data.success) {
      alert("Conteúdo salvo com sucesso. Aguarde o redeploy da Vercel.");
    } else {
      alert(data.message || "Erro ao salvar");
    }
  }

  function updateValue(path: string[], value: any) {
    if (!content) return;

    const updated = structuredClone(content);
    let current = updated;

    path.slice(0, -1).forEach((key) => {
      current = current[key];
    });

    current[path[path.length - 1]] = value;
    setContent(updated);
  }

  function renderField(label: string, value: any, path: string[]) {
    if (Array.isArray(value)) {
      return (
        <div className="border rounded-xl p-4 mb-5 bg-slate-50">
          <h3 className="font-bold text-lg mb-3 capitalize">{label}</h3>

          {value.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 bg-white">
              <div className="font-semibold mb-3">Item {index + 1}</div>
              {renderField(`${label} ${index + 1}`, item, [...path, String(index)])}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-black mb-5 capitalize">{label}</h2>

          {Object.entries(value).map(([key, val]) => (
            <div key={key}>{renderField(key, val, [...path, key])}</div>
          ))}
        </div>
      );
    }

    if (typeof value === "string") {
      const isLong = value.length > 80;

      return (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 capitalize">
            {label}
          </label>

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
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black">Admin WM Soluções</h1>
            <p className="text-slate-600">
              Edite todos os textos do site abaixo.
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

        {Object.entries(content).map(([key, value]) => (
          <div key={key}>{renderField(key, value, [key])}</div>
        ))}

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
