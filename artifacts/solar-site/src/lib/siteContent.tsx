import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type SiteContent = Record<string, any>;

const SiteContentContext = createContext<SiteContent | null>(null);

function setMeta(name: string, content: string) {
  if (!content || typeof document === "undefined") return;

  const selectors = [
    `meta[name="${name}"]`,
    `meta[property="${name}"]`,
  ];

  const tag = document.querySelector<HTMLMetaElement>(selectors.join(","));

  if (tag) {
    tag.setAttribute("content", content);
  }
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    let mounted = true;

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

        if (data?.seo?.title) {
          document.title = data.seo.title;
        }

        setMeta("description", data?.seo?.description);
        setMeta("keywords", data?.seo?.keywords);
        setMeta("og:title", data?.seo?.ogTitle || data?.seo?.title);
        setMeta("og:description", data?.seo?.ogDescription || data?.seo?.description);
        setMeta("twitter:title", data?.seo?.ogTitle || data?.seo?.title);
        setMeta("twitter:description", data?.seo?.ogDescription || data?.seo?.description);
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
