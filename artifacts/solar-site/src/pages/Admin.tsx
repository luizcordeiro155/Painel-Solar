import { useState, useEffect } from "react";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch("/site-content.json")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  async function login() {
    const response = await fetch("/api/admin-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "login",
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setAuthorized(true);
    } else {
      alert("Senha incorreta");
    }
  }

  async function save() {
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

    if (data.success) {
      alert("Conteúdo atualizado com sucesso");
    } else {
      alert("Erro ao salvar");
    }
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-white p-8 rounded-xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">
            Painel Administrativo
          </h1>

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded w-full mb-4"
          />

          <button
            onClick={login}
            className="bg-orange-500 text-white w-full py-3 rounded"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin WM Soluções
      </h1>

      <div className="bg-white rounded-xl p-6 mb-6">
        <h2 className="font-bold text-xl mb-4">
          Hero
        </h2>

        <input
          className="border p-3 w-full mb-3"
          value={content.hero.titleLine1}
          onChange={(e) =>
            setContent({
              ...content,
              hero: {
                ...content.hero,
                titleLine1: e.target.value,
              },
            })
          }
        />

        <input
          className="border p-3 w-full mb-3"
          value={content.hero.titleLine2}
          onChange={(e) =>
            setContent({
              ...content,
              hero: {
                ...content.hero,
                titleLine2: e.target.value,
              },
            })
          }
        />

        <textarea
          className="border p-3 w-full h-40"
          value={content.hero.description}
          onChange={(e) =>
            setContent({
              ...content,
              hero: {
                ...content.hero,
                description: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="bg-white rounded-xl p-6 mb-6">
        <h2 className="font-bold text-xl mb-4">
          Contato
        </h2>

        <input
          className="border p-3 w-full mb-3"
          value={content.contact.phone}
          onChange={(e) =>
            setContent({
              ...content,
              contact: {
                ...content.contact,
                phone: e.target.value,
              },
            })
          }
        />

        <input
          className="border p-3 w-full mb-3"
          value={content.contact.email}
          onChange={(e) =>
            setContent({
              ...content,
              contact: {
                ...content.contact,
                email: e.target.value,
              },
            })
          }
        />

        <input
          className="border p-3 w-full"
          value={content.contact.instagram}
          onChange={(e) =>
            setContent({
              ...content,
              contact: {
                ...content.contact,
                instagram: e.target.value,
              },
            })
          }
        />
      </div>

      <button
        onClick={save}
        className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold"
      >
        Salvar Alterações
      </button>
    </div>
  );
}
