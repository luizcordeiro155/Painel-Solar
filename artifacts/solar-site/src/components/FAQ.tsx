import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
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
      answer: "Na maioria dos casos, a instalação é concluída em um único dia. O prazo pode variar dependendo do porte do sistema (condomínio ou sistema industrial pode levar mais tempo), mas sempre comunicamos com antecedência o cronograma completo.",
    },
    {
      question: "Por quanto tempo o equipamento dura?",
      answer: "Com manutenção adequada, os coletores solares têm vida útil superior a 20 anos e o boiler (reservatório) de 15 a 20 anos. A WM Soluções trabalha com marcas renomadas e oferece manutenção preventiva para garantir a longevidade do seu investimento.",
    },
    {
      question: "A WM Soluções atende condomínios e empresas?",
      answer: "Sim! Atendemos residências, estabelecimentos comerciais (pousadas, hotéis, academias, restaurantes) e condomínios de todos os portes. Temos soluções dimensionadas para cada tipo de demanda, sempre com consultoria técnica personalizada.",
    },
    {
      question: "Como funciona a manutenção preventiva?",
      answer: "Realizamos visitas periódicas para verificar o funcionamento do sistema, checar conexões, limpar os coletores e garantir que tudo está operando com eficiência máxima. Também oferecemos atendimento corretivo rápido em caso de qualquer falha.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Tire suas dúvidas
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4"
          >
            Perguntas Frequentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Ainda tem dúvidas? Fale diretamente com um especialista pelo WhatsApp.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border py-2"
              >
                <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
