import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function AnimatedCounter({
  value,
  duration = 1600,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(value);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;

    setCount(value);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    setCount(0);

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const nextValue = Math.round(value * eased);
      setCount(nextValue);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frame = requestAnimationFrame(animate);

    const fallback = window.setTimeout(() => {
      setCount(value);
    }, duration + 300);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
    };
  }, [value, duration]);

  return <>{count.toLocaleString("pt-BR")}+</>;
}

export default function Numbers() {
  const stats = [
    { label: "Clientes Atendidos", value: 500 },
    { label: "Sistemas Instalados", value: 620 },
    { label: "Anos de Experiência", value: 10 },
    { label: "Cidades Atendidas", value: 15 },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center p-4"
            >
              <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-slate-900 tabular-nums">
                <AnimatedCounter value={stat.value} />
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
