import { motion } from "framer-motion";
import { HelpCircle, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteContent } from "@/lib/siteContent";

export default function FAQ() {
  const content = useSiteContent();
  const faqContent = content?.faq;
  const faqs = faqContent?.items?.length
    ? faqContent.items
    : [
        {
          question: "Qual a diferença entre o sistema convencional e o sistema a vácuo?",
          answer: "O sistema convencional utiliza coletores planos e é a opção mais econômica, funcionando muito bem em regiões com boa incidência solar. Já o sistema a vácuo usa tubos de alto vácuo que isolam o calor com mais eficiência, sendo ideal para regiões mais frias ou para quem deseja máxima performance mesmo em dias nublados. Nossa consultoria indica o melhor sistema para sua situação.",
        },
        {
          question: "O aquecedor solar funciona em dias nublados ou no inverno?",
          answer: "Sim! O aquecedor solar capta a energia solar difusa, presente mesmo em dias nublados. Em dias muito frios ou com pouca incidência solar, os sistemas contam com resistência elétrica auxiliar para garantir a temperatura da água, assegurando conforto o ano todo.",
        },
        {
          question: "Quanto tempo leva a instalação?",
          answer: "Na maioria dos casos, a instalação é concluída em um único dia. O prazo pode variar dependendo do porte do sistema, mas sempre comunicamos com antecedência o cronograma completo.",
        },
        {
          question: "Por quanto tempo o equipamento dura?",
          answer: "Com manutenção adequada, os coletores solares têm vida útil superior a 20 anos e o boiler de 15 a 20 anos. A WM Soluções trabalha com marcas renomadas e oferece manutenção preventiva para garantir a longevidade do seu investimento.",
        },
        {
          question: "A WM Soluções atende condomínios e empresas?",
          answer: "Sim! Atendemos residências, estabelecimentos comerciais e condomínios de todos os portes. Temos soluções dimensionadas para cada tipo de demanda, sempre com consultoria técnica personalizada.",
        },
        {
          question: "Como funciona a manutenção preventiva?",
          answer: "Realizamos visitas periódicas para verificar o funcionamento do sistema, checar conexões, limpar os coletores e garantir que tudo está operando com eficiência máxima.",
        },
      ];

  return (
    <section id="faq" className="relative overflow-hidden bg-background py-28">
      <div className="solar-glow right-[-12rem] top-12 opacity-45" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              <Sparkles size={14} />
              {faqContent?.eyebrow || "Tire suas dúvidas"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-5 text-4xl font-black tracking-[-0.045em] text-foreground md:text-6xl"
            >
              {faqContent?.title || "Perguntas Frequentes"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground"
            >
              {faqContent?.description || "Ainda tem dúvidas? Fale diretamente com um especialista pelo WhatsApp."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.18, duration: 0.62 }}
            className="premium-card p-3 md:p-5"
          >
            <Accordion type="single" collapsible className="relative z-10 w-full space-y-3">
              {faqs.map((faq: any, index: number) => (
                <AccordionItem
                  key={faq.question || index}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white px-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <AccordionTrigger className="gap-4 py-5 text-left text-base font-black text-slate-950 transition-colors hover:text-primary hover:no-underline md:text-lg">
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary md:flex">
                        <HelpCircle size={18} />
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-0 text-sm leading-relaxed text-slate-600 md:pl-12 md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
