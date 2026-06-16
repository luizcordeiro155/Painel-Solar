import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Flame, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent, whatsappUrl } from "@/lib/siteContent";

export default function Offer() {
  const content = useSiteContent();
  const offer = content?.offer;
  const contact = content?.contact;

  const handleWhatsApp = () => {
    window.open(
      whatsappUrl(contact?.phoneRaw || "5531997544806", contact?.whatsappMessageOffer || contact?.whatsappMessage || "Olá, WM Soluções! Gostaria de um orçamento para aquecedor solar."),
      "_blank"
    );
  };

  const included = offer?.included?.length
    ? offer.included
    : [
        "Consultoria técnica personalizada (incluso)",
        "Dimensionamento do sistema ideal para sua demanda",
        "Instalação por equipe certificada e experiente",
        "Equipamentos de alta qualidade com garantia de fábrica",
        "Orientação completa sobre uso e cuidados",
        "Suporte pós-instalação da WM Soluções",
        "Financiamento facilitado com parcelas acessíveis",
      ];

  return (
    <section
      id="oferta"
      className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold mb-6">
            <Gift size={15} /> {offer?.eyebrow || "Orçamento 100% Gratuito"}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            {offer?.titleStart || "Água Quente todo dia com"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
              {offer?.titleHighlight || "Tecnologia Solar de Verdade"}
            </span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            {offer?.description || "A WM Soluções cuida de tudo da escolha do sistema à instalação e manutenção para que você só se preocupe em aproveitar o conforto."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary p-2 rounded-lg">
              <Flame size={20} className="text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold">
              {offer?.cardTitle || "Tudo incluso no seu projeto solar"}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {included.map((item: string, i: number) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black text-lg h-14 px-10 rounded-full shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all"
              data-testid="offer-cta-button"
            >
              {offer?.button || "Quero Meu Orçamento Grátis"} <ArrowRight className="ml-2" size={20} />
            </Button>
            <p className="text-slate-400 text-sm text-center sm:text-left">
              {offer?.note || "Sem compromisso. Resposta em minutos."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
