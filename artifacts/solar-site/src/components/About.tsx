import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent, whatsappUrl } from "@/lib/siteContent";

export default function About() {
  const content = useSiteContent();
  const about = content?.about;
  const contact = content?.contact;
  const diferenciais = about?.diferenciais?.length
    ? about.diferenciais
    : [
        "Equipamentos de alta qualidade com tecnologia avançada",
        "Atendimento rápido, humanizado e sem burocracia",
        "Técnicos certificados e experientes",
        "Projetos personalizados para cada cliente",
        "Suporte completo: do projeto à manutenção",
        "Atendemos residências, comércios e condomínios",
      ];

  const handleWhatsApp = () => {
    window.open(
      whatsappUrl(contact?.phoneRaw || "5531997544806", contact?.whatsappMessageSpecialist || contact?.whatsappMessage || "Olá! Gostaria de falar com um especialista da WM Soluções!"),
      "_blank"
    );
  };

  return (
    <section id="sobre" className="relative overflow-hidden py-24 bg-gradient-to-b from-background via-amber-50/70 to-background md:from-[#d8d2c8] md:via-[#cec7bd] md:to-[#d9d2c7]">
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_12%_30%,rgba(245,158,11,0.10),transparent_30rem),radial-gradient(circle_at_90%_70%,rgba(15,23,42,0.06),transparent_28rem)] md:block" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/18 aspect-[4/3] border border-white/40">
              <img
                src={about?.image || "/about.png"}
                alt={about?.imageAlt || "Equipe WM Soluções realizando instalação profissional de aquecedor solar"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white/90 p-6 rounded-2xl shadow-xl shadow-slate-900/16 border border-primary/10 max-w-[240px] backdrop-blur-xl">
              <div className="text-4xl font-black text-primary mb-1">{about?.badgeNumber || "100%"}</div>
              <div className="text-sm text-muted-foreground font-medium">
                {about?.badgeText || "Focados na satisfação do cliente"}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2rem] border border-white/35 bg-white/35 p-6 shadow-xl shadow-slate-900/8 backdrop-blur-sm md:p-8"
          >
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {about?.eyebrow || "Quem Somos"}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-foreground leading-tight">
              {about?.title || "Especialistas em aquecimento solar com tecnologia de ponta"}
            </h2>
            <p className="text-lg text-muted-foreground md:text-slate-700 mb-4 leading-relaxed">
              {about?.paragraph1 || "A WM Soluções é especializada na venda e instalação de aquecedores solares para banho e piscina. Trabalhamos com equipamentos de alta qualidade e tecnologia avançada, ideais para residências, comércios e condomínios."}
            </p>
            <p className="text-base text-muted-foreground md:text-slate-700 mb-8 leading-relaxed">
              {about?.paragraph2 || "Nosso compromisso vai além da instalação: oferecemos manutenção preventiva e corretiva, consultoria técnica personalizada e um atendimento ágil e humanizado que coloca o cliente sempre em primeiro lugar."}
            </p>

            <ul className="space-y-3 mb-8">
              {diferenciais.map((item: string, index: number) => (
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
              {about?.button || "Falar com um Especialista"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
