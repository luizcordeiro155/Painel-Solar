import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function AnimatedCounter({
  end,
  duration = 1.8,
  suffix = "",
  prefix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(end);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    setCount(0);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(end * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    const fallback = window.setTimeout(() => {
      setCount(end);
    }, duration * 1000 + 500);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(fallback);
    };
  }, [end, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export default function Numbers() {
  const stats: { label: string; value: number; suffix: string; prefix?: string }[] = [
    { label: "Clientes Atendidos", value: 500, suffix: "+" },
    { label: "Sistemas Instalados", value: 620, suffix: "+" },
    { label: "Anos de Experiência", value: 10, suffix: "+" },
    { label: "Cidades Atendidas", value: 15, suffix: "+" },
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
              <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-slate-900">
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
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
