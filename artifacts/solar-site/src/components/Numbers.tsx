import { motion } from "framer-motion";
import { useSiteContent } from "@/lib/siteContent";

export default function Numbers() {
  const content = useSiteContent();

  if (!content) return null;

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {content.numbers.map((stat: any, index: number) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center p-4"
            >
              <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-slate-900">
                {stat.value}
              </div>

              <div className="text-slate-900/70 font-semibold uppercase tracking-wider text-xs md:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
