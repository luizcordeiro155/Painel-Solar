import { motion } from "framer-motion";
import { MessageCircle, ClipboardList, Wrench, CheckCircle } from "lucide-react";
import { useSiteContent } from "@/lib/siteContent";

const stepIcons = [MessageCircle, ClipboardList, Wrench, CheckCircle];

export default function HowItWorks() {
  const content = useSiteContent();
  const howItWorks = content?.howItWorks;
  const steps = howItWorks?.steps?.length
    ? howItWorks.steps
    : [
        {
          title: "Fale Conosco",
          description: "Entre em contato pelo WhatsApp. Nosso atendimento é rápido e humanizado sem burocracia e sem enrolação.",
        },
        {
          title: "Consultoria e Orçamento",
          description: "Um técnico especialista analisa seu perfil de consumo, o espaço disponível e indica o sistema ideal. Orçamento detalhado e transparente.",
        },
        {
          title: "Instalação Profissional",
          description: "Nossa equipe certificada realiza a instalação com eficiência e cuidado. Em geral, concluída em 1 dia, com acabamento impecável.",
        },
        {
          title: "Água Quente Garantida",
          description: "A partir do primeiro dia, seu aquecedor solar já está funcionando. Você ainda conta com suporte e manutenção da WM Soluções.",
        },
      ];

  return (
    <section id="como-funciona" className="py-24 bg-slate-900 text-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            {howItWorks?.eyebrow || "Do contato à água quente"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4"
          >
            {howItWorks?.title || "Como Funciona"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
            {howItWorks?.description || "Um processo simples e transparente. Nós cuidamos de tudo você só aproveita o conforto."}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-800" />

          {steps.map((step: any, index: number) => {
            const Icon = stepIcons[index] || CheckCircle;

            return (
              <motion.div
                key={step.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center relative z-10 mb-6 shadow-xl">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center relative z-20">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{index + 1}. {step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
