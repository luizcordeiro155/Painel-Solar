import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brand = content?.brand;
  const contact = content?.contact;
  const navbar = content?.navbar;
  const navLinks = navbar?.links?.length ? navbar.links : fallbackNavLinks;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open(
      whatsappUrl(contact?.phoneRaw || "5531997544806", contact?.whatsappMessage || "Olá! Gostaria de um orçamento de aquecedor solar!"),
      "_blank"
    );
  };

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <img
              src={brand?.logo || "/logo.png"}
              alt={brand?.name || "WM Soluções"}
              className="h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform"
            />

            <span
              className={`text-xl md:text-2xl font-black tracking-tight ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              {brand?.namePart1 || "WM"} <span className="text-primary">{brand?.namePart2 || "Soluções"}</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link: any) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary ${
                  isScrolled ? "text-slate-700" : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}

            <Button
              onClick={handleWhatsApp}
              className="bg-primary text-white hover:bg-primary/90 font-bold whitespace-nowrap px-5"
            >
              {navbar?.button || "Pedir Orçamento"}
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={navbar?.menuLabel || "Menu"}
          >
            {mobileMenuOpen ? (
              <X size={24} className={isScrolled ? "text-slate-900" : "text-white"} />
            ) : (
              <Menu size={24} className={isScrolled ? "text-slate-900" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-6 lg:hidden flex flex-col gap-1"
          >
            {navLinks.map((link: any) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="text-base font-medium text-slate-800 py-3 border-b border-slate-100 last:border-0 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}

            <Button
              onClick={handleWhatsApp}
              className="w-full mt-3 bg-primary text-white font-bold"
            >
              {navbar?.mobileButton || "Pedir Orçamento Agora"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
