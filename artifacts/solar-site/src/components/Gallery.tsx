import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/lib/siteContent";

const fallbackProjects = [
  {
    src: "/gallery-1.png",
    alt: "Instalação de aquecedor solar residencial com tubos a vácuo",
    label: "Sistema a Vácuo — Residencial",
  },
  {
    src: "/gallery-2.png",
    alt: "Coletores solares planos instalados em residência moderna",
    label: "Sistema Convencional — Residencial",
  },
  {
    src: "/gallery-3.png",
    alt: "Aquecimento solar de piscina com coletores no telhado",
    label: "Aquecimento de Piscina",
  },
  {
    src: "/gallery-4.png",
    alt: "Sistema solar em condomínio com múltiplos coletores organizados",
    label: "Sistema Solar — Condomínio",
  },
  {
    src: "/gallery-5.png",
    alt: "Detalhe dos tubos a vácuo do sistema de aquecimento solar",
    label: "Detalhe — Tubos a Vácuo",
  },
  {
    src: "/gallery-6.png",
    alt: "Aquecimento solar instalado em estabelecimento comercial",
    label: "Sistema Solar — Comercial",
  },
];

export default function Gallery() {
  const content = useSiteContent();
  const gallery = content?.gallery;
  const projects = gallery?.projects?.length ? gallery.projects : fallbackProjects;
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + projects.length) % projects.length : null));
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % projects.length : null));

  return (
    <section id="galeria" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            {gallery?.eyebrow || "Projetos Realizados"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4 text-foreground"
          >
            {gallery?.title || "Nossos Trabalhos"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            {gallery?.description || "Cada instalação é única. Veja alguns dos projetos que entregamos com qualidade e profissionalismo."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={project.src || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => setLightbox(index)}
              data-testid={`gallery-item-${index}`}
            >
              <img
                src={project.src}
                alt={project.alt || project.label || "Projeto realizado"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-bold text-sm md:text-base">{project.label}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                <ZoomIn size={18} className="text-slate-800" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && projects[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors z-10"
              onClick={() => setLightbox(null)}
              aria-label={gallery?.closeLabel || "Fechar"}
            >
              <X size={24} />
            </button>

            <button
              className="absolute left-3 md:left-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={gallery?.prevLabel || "Anterior"}
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full mx-14 md:mx-20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={projects[lightbox].src}
                alt={projects[lightbox].alt || projects[lightbox].label || "Projeto realizado"}
                className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <p className="text-center text-white/80 mt-4 text-sm font-medium">
                {projects[lightbox].label}
              </p>
            </motion.div>

            <button
              className="absolute right-3 md:right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={gallery?.nextLabel || "Próximo"}
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-6 flex gap-2 justify-center">
              {projects.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === lightbox ? "bg-primary w-5" : "bg-white/40"
                  }`}
                  aria-label={`${gallery?.imageLabelPrefix || "Imagem"} ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
