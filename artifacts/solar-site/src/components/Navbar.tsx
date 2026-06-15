import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Sistemas", href: "#servicos" },
    { name: "Benefícios", href: "#beneficios" },
    { name: "Como Funciona", href: "#como-funciona" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/5531997544806?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20aquecedor%20solar!",
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
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="bg-primary p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform">
              <Flame size={22} strokeWidth={2.5} />
            </div>
            <span className={`text-xl font-black tracking-tight ${isScrolled ? "text-slate-900" : "text-white"}`}>
              WM <span className="text-primary">Soluções</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
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
              Pedir Orçamento
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className={isScrolled ? "text-slate-900" : "text-white"} />
            ) : (
              <Menu size={24} className={isScrolled ? "text-slate-900" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-6 lg:hidden flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-base font-medium text-slate-800 py-3 border-b border-slate-100 last:border-0 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button
              onClick={handleWhatsApp}
              className="w-full mt-3 bg-primary text-white font-bold"
            >
              Pedir Orçamento Agora
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
