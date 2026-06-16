import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent, telUrl, whatsappUrl } from "@/lib/siteContent";

export default function Contact() {
  const content = useSiteContent();
  const contactSection = content?.contactSection;
  const contact = content?.contact;

  const handleWhatsApp = () => {
    window.open(
      whatsappUrl(contact?.phoneRaw || "5531997544806", contact?.whatsappMessageOffer || contact?.whatsappMessage || "Olá, WM Soluções! Gostaria de um orçamento para aquecedor solar."),
      "_blank"
    );
  };

  return (
    <section id="contato" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={contactSection?.background || "/cta-bg.png"}
          alt={contactSection?.backgroundAlt || "Aquecedor solar instalado"}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-900/88 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold mb-6">
            <Clock size={14} /> {contactSection?.eyebrow || "Atendimento rápido — resposta em minutos"}
          </span>

          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
            {contactSection?.titleStart || "Pronto para ter"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
              {contactSection?.titleHighlight || "água quente todos os dias?"}
            </span>
          </h2>
          <p className="text-lg text-slate-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            {contactSection?.description || "Fale agora com a WM Soluções. Nosso especialista vai analisar a sua necessidade e indicar o melhor sistema de aquecimento solar para você sem compromisso."}
          </p>
          <p className="text-base text-primary font-bold mb-10">
            {contactSection?.highlight || "Orçamento gratuito. Instalação profissional. Atendimento humanizado."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              size="lg"
              onClick={handleWhatsApp}
              data-testid="contact-whatsapp-button"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-lg h-16 px-10 rounded-full shadow-xl shadow-[#25D366]/25 transition-all hover:-translate-y-1 w-full sm:w-auto"
            >
              <MessageCircle className="mr-2" size={24} />
              {contactSection?.button || "Falar com a WM Soluções"}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Phone size={14} />
            <span>
              {contactSection?.phonePrefix || "Ou ligue diretamente:"}{" "}
              <a
                href={telUrl(contact?.phoneRaw || "5531997544806")}
                className="text-white font-semibold hover:text-primary transition-colors"
              >
                {contact?.phone || "(31) 99754-4806"}
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
