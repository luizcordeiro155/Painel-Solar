import { motion } from "framer-motion";
import { ArrowRight, Droplets, ShieldCheck, Wrench, Star } from "lucide-react";
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
    <section className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={hero?.background || "/hero-bg.png"}
          alt={hero?.backgroundAlt || "Aquecedor solar instalado em residência"}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 mb-6 flex-wrap"
          >
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-medium">
              {hero?.socialProof || "+500 clientes com água quente todos os dias"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight"
          >
            {hero?.titleLine1 || "Água Quente o Ano"}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
              {hero?.titleLine2 || "Todo com Energia Solar"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-slate-200 mb-4 max-w-2xl leading-relaxed"
          >
            {hero?.description || (
              <>
                A <strong className="text-primary">{brand?.name || "WM Soluções"}</strong> instala aquecedores solares de alta qualidade para banho e piscina em residências, comércios e condomínios. Tecnologia avançada, instalação profissional e atendimento humanizado.
              </>
            )}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base text-primary font-semibold mb-10"
          >
            {hero?.highlight || "Orçamento gratuito e sem compromisso. Resposta em minutos."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={handleWhatsApp}
              data-testid="hero-cta-primary"
              className="bg-primary hover:bg-primary/90 text-white font-black text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1"
            >
              {hero?.primaryButton || "Quero Meu Orçamento Grátis"} <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsApp}
              data-testid="hero-cta-secondary"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg h-14 px-8 rounded-full transition-all"
            >
              {hero?.secondaryButton || "Falar com Especialista"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10"
          >
            {badges.map((badge: string, index: number) => {
              const Icon = badgeIcons[index] || ShieldCheck;

              return (
                <div key={badge} className="flex items-center gap-3 text-white/80">
                  <Icon className="text-primary flex-shrink-0" size={22} />
                  <span className="font-semibold text-sm md:text-base">{badge}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
