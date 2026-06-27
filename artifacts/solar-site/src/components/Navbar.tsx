import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSiteContent, whatsappUrl } from "@/lib/siteContent";

const fallbackNavLinks = [
  { name: "Sobre", href: "#sobre" },
  { name: "Sistemas", href: "#servicos" },
  { name: "Benefícios", href: "#beneficios" },
  { name: "Como Funciona", href: "#como-funciona" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const content = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brand = content?.brand;
  const contact = content?.contact;
  const navbar = content?.navbar;
  const navLinks = navbar?.links?.length ? navbar.links : fallbackNavLinks;

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  const handleWhatsApp = () => {
    window.open(
      whatsappUrl(contact?.phoneRaw || "5531997544806", contact?.whatsappMessage || "Olá! Gostaria de um orçamento de aquecedor solar!"),
      "_blank"
    );
  };

  const scrollTo = (href: string) => {
    const hash = href?.startsWith("#") ? href : `#${href}`;
    const id = hash.slice(1);
    setMobileMenuOpen(false);

    setTimeout(() => {
      const el = document.getElementById(id) || document.querySelector(hash);
      if (!el) return;
      const offset = 86;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#070b1a] shadow-lg shadow-slate-950/20 backdrop-blur-2xl">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto max-w-7xl bg-[#070b1a]"
      >
        <div className="flex h-[76px] items-center justify-between gap-4 px-4 md:px-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex flex-shrink-0 items-center gap-3"
          >
            <span className="relative flex h-12 w-12 items-center justify-center bg-transparent transition-transform group-hover:scale-105 md:h-14 md:w-14">
              <img
                src={brand?.logo || "/logo.png"}
                alt={brand?.name || "WM Soluções"}
                className="max-h-12 w-auto object-contain drop-shadow-lg md:max-h-14"
              />
            </span>

            <span className="text-lg font-black tracking-tight text-white transition-colors md:text-2xl">
              {brand?.namePart1 || "WM"} <span className="text-primary">{brand?.namePart2 || "Soluções"}</span>
            </span>
          </a>

          <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.08] px-2 py-2 lg:flex">
            {navLinks.map((link: any) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="group relative rounded-full px-4 py-2 text-sm font-bold text-white/90 transition-all hover:text-primary"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 scale-90 rounded-full bg-primary/10 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              onClick={handleWhatsApp}
              className="h-12 rounded-full bg-primary px-6 font-black text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-primary/45"
            >
              {navbar?.button || "Pedir Orçamento"}
              <ArrowUpRight className="ml-2" size={18} />
            </Button>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white transition-all hover:bg-white/15 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={navbar?.menuLabel || "Menu"}
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="overflow-hidden border-t border-white/10 bg-[#070b1a] px-4 pb-4 lg:hidden"
            >
              <div className="mt-3 grid gap-2 rounded-[1.4rem] bg-white/10 p-2 backdrop-blur-xl">
                {navLinks.map((link: any, index: number) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="rounded-2xl px-4 py-3 text-base font-black text-white transition-all hover:bg-white/10 hover:text-primary"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <Button
                onClick={handleWhatsApp}
                className="mt-4 h-13 w-full rounded-2xl bg-primary text-base font-black text-white shadow-lg shadow-primary/30"
              >
                {navbar?.mobileButton || "Pedir Orçamento Agora"}
                <ArrowUpRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
