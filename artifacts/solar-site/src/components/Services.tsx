import { motion } from "framer-motion";
import { Home, Building2, Users, Wrench, ClipboardCheck, Headphones, Waves, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    <section id="servicos" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            {servicesContent?.eyebrow || "Nossas Soluções"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4 text-foreground"
          >
            {servicesContent?.title || "Sistemas e Serviços Completos"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            {servicesContent?.description || "Atendemos todos os perfis: desde uma residência familiar até grandes condomínios e estabelecimentos comerciais."}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 flex-wrap mb-14"
        >
          {segments.map((label: string, index: number) => {
            const Icon = segmentIcons[index] || Home;

            return (
              <div key={label} className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-semibold">
                <Icon size={22} />
                {label}
              </div>
            );
          })}
        </motion.div>

        <h3 className="text-xl font-bold text-foreground mb-6 text-center">
          {servicesContent?.systemsTitle || "Tipos de Sistema"}
        </h3>
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {systems.map((item: any, index: number) => {
            const Icon = systemIcons[index] || Zap;

            return (
              <motion.div
                key={item.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-border/50 bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon size={28} />
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{item.description}</p>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group/btn hover:bg-primary hover:text-white"
                      onClick={handleWhatsApp}
                    >
                      {item.button || "Saiba mais"}
                      <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-6 text-center">
          {servicesContent?.specializedTitle || "Serviços Especializados"}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {specialized.map((item: any, index: number) => {
            const Icon = serviceIcons[index] || Wrench;

            return (
              <motion.div
                key={item.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-border/50 bg-card hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="bg-secondary/10 p-3 rounded-xl text-secondary w-fit mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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
