import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";

export default function PromoBanner() {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/5531997544806?text=Ol%C3%A1!%20Vi%20a%20oferta%20no%20site%20e%20quero%20meu%20or%C3%A7amento%20gr%C3%A1tis!",
      "_blank"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-primary via-yellow-400 to-primary text-slate-900 py-2.5 px-4 text-center text-sm font-semibold cursor-pointer hover:brightness-105 transition-all z-[60] relative"
      onClick={handleWhatsApp}
      data-testid="promo-banner"
    >
      <span className="flex items-center justify-center gap-2 flex-wrap">
        <Tag size={15} className="flex-shrink-0" />
        <span>
          Orçamento 100% Gratuito e Sem Compromisso — Economize até R$&nbsp;600 por mês na sua conta de luz
        </span>
        <span className="inline-flex items-center gap-1 underline underline-offset-2 font-bold">
          Fale Agora <ArrowRight size={13} />
        </span>
      </span>
    </motion.div>
  );
}
