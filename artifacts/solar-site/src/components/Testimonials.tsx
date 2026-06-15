import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Fernanda Oliveira",
      role: "Proprietária Residencial — BH/MG",
      content: "Excelente atendimento desde o primeiro contato. O técnico foi muito atencioso, explicou tudo direitinho e a instalação foi feita em um dia. Minha conta de luz caiu bastante. Super recomendo a WM Soluções!",
      initials: "FO",
    },
    {
      name: "Ricardo Mendes",
      role: "Síndico de Condomínio — BH/MG",
      content: "Contratamos a WM Soluções para instalar aquecedores solares no condomínio. O serviço foi impecável, o prazo foi cumprido e os moradores estão muito satisfeitos com o resultado. Parceria excelente!",
      initials: "RM",
    },
    {
      name: "Luciana Ferreira",
      role: "Proprietária de Pousada — MG",
      content: "Precisava de aquecimento para a piscina e para os quartos. A equipe da WM fez uma consultoria completa e entregou a solução perfeita para a pousada. Atendimento humanizado e trabalho de qualidade.",
      initials: "LF",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4 text-foreground"
          >
            O que nossos clientes dizem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            A satisfação dos nossos clientes é o nosso maior resultado.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg bg-card">
                <CardContent className="p-8 flex flex-col h-full">
                  <Quote className="text-primary/30 mb-4" size={36} />
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-8 flex-1 text-sm md:text-base italic">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-black text-primary text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
