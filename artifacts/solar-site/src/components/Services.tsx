import { motion } from "framer-motion";
import { Home, Building2, Users, Wrench, ClipboardCheck, Headphones, Waves, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent, whatsappUrl } from "@/lib/siteContent";

const systemIcons = [Zap, Zap, Waves];
const serviceIcons = [Wrench, ClipboardCheck, Headphones];
const segmentIcons = [Home, Building2, Users];

export default function Services() {
  const content = useSiteContent();
  const servicesContent = content?.services;
  const contact = content?.contact;

  const handleWhatsApp = () => {
    window.open(
      whatsappUrl(contact?.phoneRaw || "5531997544806", contact?.whatsappMessageServices || contact?.whatsappMessage || "Olá! Gostaria de saber mais sobre os sistemas de aquecimento solar!"),
      "_blank"
    );
  };

  const systems = servicesContent?.systems?.length
    ? servicesContent.systems
    : [
        {
          title: "Sistema Convencional",
          description: "Solução mais difundida no mercado. Utiliza coletores planos e boiler para aquecer a água de forma eficiente e econômica, ideal para quem busca boa relação custo-benefício.",
          tag: "Mais popular",
          button: "Saiba mais",
        },
        {
          title: "Sistema a Vácuo",
          description: "Tecnologia premium com tubos de vácuo que maximizam a captação de calor mesmo em dias nublados ou frios. Maior eficiência energética e desempenho superior em qualquer clima.",
          tag: "Alta eficiência",
          button: "Saiba mais",
        },
        {
          title: "Aquecimento de Piscinas",
          description: "Mantenha sua piscina na temperatura ideal o ano todo com coletores solares especializados. Conforto e economia em uma solução sustentável para piscinas residenciais e comerciais.",
          tag: "Conforto e lazer",
          button: "Saiba mais",
        },
      ];

  const specialized = servicesContent?.specialized?.length
    ? servicesContent.specialized
    : [
        {
          title: "Instalação Profissional",
          description: "Equipe técnica certificada realiza a instalação com segurança, rapidez e acabamento impecável. Do projeto à entrega, cuidamos de tudo.",
        },
        {
          title: "Manutenção Preventiva e Corretiva",
          description: "Garantimos a longevidade e a eficiência do seu sistema com visitas de manutenção programadas e atendimento rápido em caso de falhas.",
        },
        {
          title: "Consultoria Técnica Personalizada",
          description: "Analisamos o seu perfil de consumo, o espaço disponível e o orçamento para indicar o sistema ideal para a sua necessidade.",
        },
      ];

  const segments = servicesContent?.segments?.length
    ? servicesContent.segments
    : ["Residencial", "Comercial", "Condomínios"];

  return (
    <section id="servicos" className="relative overflow-hidden py-28 bg-gradient-to-b from-background via-white to-amber-50/50 dark:via-slate-950">
      <div className="solar-glow left-[-10rem] top-24 opacity-60" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            <Sparkles size={14} />
            {servicesContent?.eyebrow || "Nossas Soluções"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-4xl font-black tracking-[-0.04em] text-foreground md:text-6xl"
          >
            {servicesContent?.title || "Sistemas e Serviços Completos"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {servicesContent?.description || "Atendemos todos os perfis: desde uma residência familiar até grandes condomínios e estabelecimentos comerciais."}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          {segments.map((label: string, index: number) => {
            const Icon = segmentIcons[index] || Home;

            return (
              <div key={label} className="flex items-center gap-2 rounded-full border border-primary/20 bg-white/75 px-5 py-3 text-sm font-black text-slate-800 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/40 hover:text-primary">
                <Icon size={20} className="text-primary" />
                {label}
              </div>
            );
          })}
        </motion.div>

        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Escolha sua tecnologia</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-foreground md:text-3xl">
              {servicesContent?.systemsTitle || "Tipos de Sistema"}
            </h3>
          </div>
        </div>

        <div className="mb-18 grid gap-6 md:grid-cols-3">
          {systems.map((item: any, index: number) => {
            const Icon = systemIcons[index] || Zap;
            const featured = index === 1;

            return (
              <motion.div
                key={item.title || index}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.58, delay: index * 0.09 }}
                className={`premium-card group h-full p-6 ${featured ? "bg-slate-950 text-white" : "bg-white/85 text-slate-950"}`}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all group-hover:scale-110 ${featured ? "bg-primary text-white shadow-primary/25" : "bg-primary/10 text-primary"}`}>
                      <Icon size={29} />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${featured ? "bg-white/10 text-primary ring-1 ring-white/10" : "bg-primary/10 text-primary ring-1 ring-primary/15"}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className={`mb-4 text-2xl font-black tracking-tight ${featured ? "text-white" : "text-slate-950"}`}>{item.title}</h3>
                  <p className={`mb-7 flex-1 text-sm leading-relaxed md:text-base ${featured ? "text-white/70" : "text-slate-600"}`}>{item.description}</p>

                  <Button
                    variant={featured ? "default" : "ghost"}
                    className={`h-12 w-full justify-between rounded-2xl font-black transition-all group-hover:-translate-y-1 ${featured ? "bg-primary text-white hover:bg-primary/95" : "bg-slate-950 text-white hover:bg-primary"}`}
                    onClick={handleWhatsApp}
                  >
                    {item.button || "Saiba mais"}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 rounded-[2rem] border border-slate-200/70 bg-white/70 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl md:p-7">
          <div className="mb-7 text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-secondary">Execução completa</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-foreground md:text-3xl">
              {servicesContent?.specializedTitle || "Serviços Especializados"}
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {specialized.map((item: any, index: number) => {
              const Icon = serviceIcons[index] || Wrench;

              return (
                <motion.div
                  key={item.title || index}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.52, delay: index * 0.08 }}
                  className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10"
                >
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-all group-hover:bg-secondary group-hover:text-white">
                    <Icon size={27} />
                  </div>
                  <h3 className="mb-3 text-xl font-black tracking-tight text-slate-950">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
