import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type SiteContent = Record<string, any>;

const SiteContentContext = createContext<SiteContent | null>(null);

const SITE_URL = "https://www.wmsolares.com.br";

function setMeta(name: string, content: string) {
  if (!content || typeof document === "undefined") return;

  const selectors = [
    `meta[name="${name}"]`,
    `meta[property="${name}"]`,
  ];

  let tag = document.querySelector<HTMLMetaElement>(selectors.join(","));

  if (!tag) {
    tag = document.createElement("meta");
    if (name.startsWith("og:")) {
      tag.setAttribute("property", name);
    } else {
      tag.setAttribute("name", name);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonical(pathname: string) {
  if (typeof document === "undefined") return;

  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  link.setAttribute("href", `${SITE_URL}${normalizedPath}`);
  setMeta("og:url", `${SITE_URL}${normalizedPath}`);
}

function applyRouteSeo() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const pathname = window.location.pathname;
  setCanonical(pathname);

  if (pathname === "/admin") {
    document.title = "Administração | WM Solares";
    setMeta("description", "Área administrativa da WM Solares.");
    setMeta("robots", "noindex, nofollow, noarchive");
    return;
  }

  if (pathname === "/termos-de-uso") {
    document.title = "Termos de Uso | WM Solares";
    setMeta(
      "description",
      "Consulte os termos de uso do site da WM Solares, empresa especializada em aquecimento solar de água em Belo Horizonte e região.",
    );
    setMeta("robots", "index, follow, max-image-preview:large");
    return;
  }

  if (pathname === "/politica-de-privacidade") {
    document.title = "Política de Privacidade | WM Solares";
    setMeta(
      "description",
      "Saiba como a WM Solares trata dados e informações de contato enviados pelo site e pelos canais de atendimento.",
    );
    setMeta("robots", "index, follow, max-image-preview:large");
    return;
  }

  document.title = "Aquecedor Solar em Belo Horizonte | Banho e Piscina | WM Solares";
  setMeta(
    "description",
    "Instalação e manutenção de aquecedor solar para banho e piscina em Belo Horizonte e região. Sistemas convencionais e a vácuo. Orçamento gratuito.",
  );
  setMeta(
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  );
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    let mounted = true;

    applyRouteSeo();

    fetch(`/site-content.json?v=${Date.now()}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar conteúdo do site");
        }

        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setContent(data);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function whatsappUrl(phoneRaw?: string, message?: string) {
  if (!phoneRaw) return "#";

  return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message || "")}`;
}

export function telUrl(phoneRaw?: string) {
  if (!phoneRaw) return "#";

  return `tel:+${phoneRaw.replace(/\D/g, "")}`;
}
