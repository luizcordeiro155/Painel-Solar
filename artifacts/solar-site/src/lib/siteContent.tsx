import { useEffect, useState } from "react";

export interface SiteContent {
  brand: {
    name: string;
    logo: string;
    favicon: string;
    ogImage: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    email: string;
    city: string;
    region: string;
    instagram: string;
    whatsappMessage: string;
  };
  hero: {
    background: string;
    socialProof: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    highlight: string;
    primaryButton: string;
    secondaryButton: string;
  };
  numbers: {
    label: string;
    value: string;
  }[];
  footer: {
    description: string;
    copyright: string;
  };
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/site-content.json")
      .then((res) => res.json())
      .then(setContent)
      .catch(console.error);
  }, []);

  return content;
}
