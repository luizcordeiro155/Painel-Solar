import { motion } from "framer-motion";
import { PiggyBank, Leaf, TrendingUp, ThumbsUp, Clock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Benefits() {
  const benefits = [
    {
      title: "Economia na Conta de Energia",
      description: "O aquecimento de água é responsável por até 30% do consumo elétrico de uma residência. Com energia solar, esse custo cai drasticamente.",
      icon: <PiggyBank className="w-10 h-10 text-primary" />,
    },
    {
      title: "Valorização do Imóvel",
      description: "Imóveis com aquecedor solar são mais valorizados no mercado. É um investimento que se paga e ainda agrega valor ao seu patrimônio.",
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
    },
    {
      title: "Sustentabilidade Real",
      description: "Utilize energia limpa e renovável para aquecer sua água. Reduza a emissão de carbono e contribua para um planeta mais equilibrado.",
      icon: <Leaf className="w-10 h-10 text-primary" />,
    },
    {
      title: "Conforto o Ano Todo",
      description: "Água quente disponível todos os dias, independente da estação. Os sistemas mais avançados mantêm a temperatura mesmo em dias frios e nublados.",
      icon: <ThumbsUp className="w-10 h-10 text-primary" />,
    },
    {
      title: "Baixa Manutenção",
      description: "Os sistemas de aquecimento solar são extremamente duráveis e simples de manter. Com manutenção adequada, funcionam por mais de 20 anos.",
      icon: <Clock className="w-10 h-10 text-primary" />,
    },
    {
      title: "Equipamentos Garantidos",
      description: "Trabalhamos apenas com equipamentos de fabricantes certificados, com garantia de fábrica e suporte técnico completo da WM Soluções.",
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <section id="beneficios" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Por que escolher
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4 text-foreground"
          >
            Vantagens do Aquecimento Solar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Mais do que conforto é um investimento inteligente que gera economia, sustentabilidade e valorização.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full border-border/50 bg-card hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
                <CardHeader>
                  <div className="mb-4 p-3 bg-primary/10 w-fit rounded-2xl">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
