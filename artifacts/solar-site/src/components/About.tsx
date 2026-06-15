import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/5531997544806?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20WM%20Solu%C3%A7%C3%B5es!",
      "_blank"
    );
  };

  const diferenciais = [
    "Equipamentos de alta qualidade com tecnologia avançada",
    "Atendimento rápido, humanizado e sem burocracia",
    "Técnicos certificados e experientes",
    "Projetos personalizados para cada cliente",
    "Suporte completo: do projeto à manutenção",
    "Atendemos residências, comércios e condomínios",
  ];

  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/about.png"
                alt="Equipe WM Soluções realizando instalação profissional de aquecedor solar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-[240px]">
              <div className="text-4xl font-black text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground font-medium">Focados na satisfação do cliente</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Quem Somos
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-foreground leading-tight">
              Especialistas em aquecimento solar com tecnologia de ponta
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              A <strong className="text-foreground">WM Soluções</strong> é especializada na venda e instalação de aquecedores solares para banho e piscina. Trabalhamos com equipamentos de alta qualidade e tecnologia avançada, ideais para residências, comércios e condomínios.
            </p>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Nosso compromisso vai além da instalação: oferecemos manutenção preventiva e corretiva, consultoria técnica personalizada e um atendimento ágil e humanizado que coloca o cliente sempre em primeiro lugar.
            </p>

            <ul className="space-y-3 mb-8">
              {diferenciais.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary mt-0.5 flex-shrink-0" size={20} />
                  <span className="text-foreground font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 rounded-full transition-colors border bg-transparent"
            >
              Falar com um Especialista
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
