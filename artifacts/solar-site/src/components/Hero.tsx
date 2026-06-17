import { motion } from "framer-motion";
import { ArrowRight, Droplets, ShieldCheck, Wrench, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent, whatsappUrl } from "@/lib/siteContent";

const badgeIcons = [Droplets, ShieldCheck, Wrench];

export default function Hero() {
  const content = useSiteContent();
  const hero = content?.hero;
  const contact = content?.contact;
  const brand = content?.brand;
  const badges = hero?.badges?.length
    ? hero.badges
    : ["Banho e Piscina", "Alta qualidade", "Instalação profissional"];

  const handleWhatsApp = () => {
    window.open(
      whatsappUrl(contact?.phoneRaw || "5531997544806", contact?.whatsappMessage || "Olá! Gostaria de um orçamento de aquecedor solar!"),
      "_blank"
    );
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 pb-20 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.8, ease: "easeOut" }}
          src={hero?.background || "/hero-bg.png"}
          alt={hero?.backgroundAlt || "Aquecedor solar instalado em residência"}
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_26%,rgba(245,158,11,0.26),transparent_28rem),linear-gradient(100deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.90)_48%,rgba(15,23,42,0.58)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-transparent" />
      </div>

      <div className="solar-glow right-[-9rem] top-24 z-[1] opacity-55" />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className="absolute right-[8%] top-[20%] z-[1] hidden h-52 w-52 rounded-full border border-primary/15 md:block"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-white shadow-2xl shadow-black/10 backdrop-blur-xl"
          >
            <span className="flex items-center gap-1 text-yellow-300">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </span>
            <span className="text-sm font-bold text-white/85">
              {hero?.socialProof || "+500 clientes com água quente todos os dias"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.22 }}
            className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white md:text-7xl lg:text-8xl"
          >
            {hero?.titleLine1 || "Água Quente o Ano"}
            <br />
            <span className="shine-line inline-block rounded-2xl bg-gradient-to-r from-primary via-amber-200 to-orange-400 bg-clip-text text-transparent">
              {hero?.titleLine2 || "Todo com Energia Solar"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.38 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl"
          >
            {hero?.description || (
              <>
                A <strong className="text-primary">{brand?.name || "WM Soluções"}</strong> instala aquecedores solares de alta qualidade para banho e piscina em residências, comércios e condomínios. Tecnologia avançada, instalação profissional e atendimento humanizado.
              </>
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.5 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-black text-primary ring-1 ring-primary/25"
          >
            <Sparkles size={17} />
            {hero?.highlight || "Orçamento gratuito e sem compromisso. Resposta em minutos."}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.66 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={handleWhatsApp}
              data-testid="hero-cta-primary"
              className="h-16 rounded-full bg-primary px-8 text-lg font-black text-white shadow-2xl shadow-primary/35 transition-all hover:-translate-y-1 hover:bg-primary/95 hover:shadow-primary/55"
            >
              {hero?.primaryButton || "Quero Meu Orçamento Grátis"}
              <ArrowRight className="ml-2" size={21} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsApp}
              data-testid="hero-cta-secondary"
              className="h-16 rounded-full border-white/25 bg-white/10 px-8 text-lg font-black text-white backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white/20 hover:text-white"
            >
              {hero?.secondaryButton || "Falar com Especialista"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.86 }}
            className="mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {badges.map((badge: string, index: number) => {
              const Icon = badgeIcons[index] || ShieldCheck;

              return (
                <div key={badge} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-white/90 backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white/15">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30 transition-all group-hover:bg-primary group-hover:text-white">
                    <Icon size={21} />
                  </span>
                  <span className="text-sm font-black md:text-base">{badge}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
