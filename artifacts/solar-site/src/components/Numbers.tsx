import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
import { useSiteContent } from "@/lib/siteContent";

const fallbackNumbers = [
  { label: "Clientes Atendidos", value: "500+" },
  { label: "Sistemas Instalados", value: "620+" },
  { label: "Anos de Experiência", value: "10+" },
  { label: "Cidades Atendidas", value: "15+" },
];

export default function Numbers() {
  const content = useSiteContent();
  const numbers = content?.numbers?.length ? content.numbers : fallbackNumbers;

  return (
    <section className="relative -mt-10 overflow-hidden py-12 md:-mt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="premium-card bg-slate-950/95 p-4 text-white md:p-6"
        >
          <div className="absolute left-8 top-6 hidden items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary ring-1 ring-primary/20 md:flex">
            <Sparkles size={15} />
            Resultados reais
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {numbers.map((stat: any, index: number) => (
              <motion.div
                key={stat.label || index}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.10] hover:shadow-2xl hover:shadow-primary/10 md:p-7"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-all group-hover:bg-primary/35" />
                <div className="relative mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25 transition-all group-hover:bg-primary group-hover:text-white">
                  <TrendingUp size={21} />
                </div>
                <div className="relative text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                  {stat.value}
                </div>
                <div className="relative mt-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/55 md:text-xs">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
