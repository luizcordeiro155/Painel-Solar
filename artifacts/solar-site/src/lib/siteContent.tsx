import { useEffect, useState } from "react";

export type SiteContent = Record<string, any>;

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/site-content.json?v=" + Date.now())
      .then((res) => res.json())
      .then(setContent)
      .catch(console.error);
  }, []);

  return content;
}

export function whatsappUrl(phoneRaw: string, message: string) {
  return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`;
}
