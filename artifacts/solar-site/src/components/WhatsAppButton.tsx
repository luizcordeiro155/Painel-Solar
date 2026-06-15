import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/5531997544806?text=Ol%C3%A1%2C%20WM%20Solu%C3%A7%C3%B5es!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20aquecedor%20solar.",
      "_blank"
    );
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-[90]"
    >
      <Button
        size="icon"
        onClick={handleWhatsApp}
        aria-label="Falar com WM Soluções no WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 relative"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30" />
        <MessageCircle size={28} strokeWidth={2.5} />
      </Button>
    </motion.div>
  );
}
