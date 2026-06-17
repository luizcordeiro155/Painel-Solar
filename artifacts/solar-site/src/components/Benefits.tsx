import { motion } from "framer-motion";
import { PiggyBank, Leaf, TrendingUp, ThumbsUp, Clock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteContent } from "@/lib/siteContent";

const benefitIcons = [PiggyBank, TrendingUp, Leaf, ThumbsUp, Clock, ShieldCheck];

export default function Benefits() {
  const content = useSiteContent();
  const benefitsContent = content?.benefits;
  const benefits = benefitsContent?.items?.length
    ? benefitsContent.items
    : [
        {
          title: "Economia na Conta de Energia",
          description: "O aquecimento de água é responsável por até 30% do consumo elétrico de uma residência. Com energia solar, esse custo cai drasticamente.",
        },
        {
          title: "Valorização do Imóvel",
          description: "Imóveis com aquecedor solar são mais valorizados no mercado. É um investimento que se paga e ainda agrega valor ao seu patrimônio.",
        },
        {
          title: "Sustentabilidade Real",
          description: "Utilize energia limpa e renovável para aquecer sua água. Reduza a emissão de carbono e contribua para um planeta mais equilibrado.",
        },
        {
          title: "Conforto o Ano Todo",
          description: "Água quente disponível todos os dias, independente da estação. Os sistemas mais avançados mantêm a temperatura mesmo em dias frios e nublados.",
        },
        {
          title: "Baixa Manutenção",
          description: "Os sistemas de aquecimento solar são extremamente duráveis e simples de manter. Com manutenção adequada, funcionam por mais de 20 anos.",
        },
        {
          title: "Equipamentos Garantidos",
          description: "Trabalhamos apenas com equipamentos de fabricantes certificados, com garantia de fábrica e suporte técnico completo da WM Soluções.",
        },
      ];

  return (
    <section id="beneficios" className="relative overflow-hidden py-24 bg-gradient-to-b from-background via-amber-50/70 to-background md:from-[#d9d2c7] md:via-[#cec7bd] md:to-[#d8d2c8]">
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_88%_18%,rgba(245,158,11,0.10),transparent_28rem),radial-gradient(circle_at_12%_70%,rgba(15,23,42,0.05),transparent_26rem)] md:block" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            {benefitsContent?.eyebrow || "Por que escolher"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4 text-foreground"
          >
            {benefitsContent?.title || "Vantagens do Aquecimento Solar"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground md:text-slate-700"
          >
            {benefitsContent?.description || "Mais do que conforto é um investimento inteligente que gera economia, sustentabilidade e valorização."}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit: any, index: number) => {
            const Icon = benefitIcons[index] || ShieldCheck;

            return (
              <motion.div
                key={benefit.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full border border-primary/10 bg-white/88 shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-slate-900/14">
                  <CardHeader>
                    <div className="mb-4 p-3 bg-primary/10 w-fit rounded-2xl shadow-sm">
                      <Icon className="w-10 h-10 text-primary" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
