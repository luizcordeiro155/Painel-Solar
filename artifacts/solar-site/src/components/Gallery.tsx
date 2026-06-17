import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Images, ArrowUpRight } from "lucide-react";
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
    <section id="galeria" className="relative overflow-hidden bg-slate-950 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(245,158,11,0.22),transparent_28rem),radial-gradient(circle_at_88%_12%,rgba(16,185,129,0.16),transparent_24rem)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-primary backdrop-blur-xl"
            >
              <Images size={14} />
              {gallery?.eyebrow || "Projetos Realizados"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-5 text-4xl font-black tracking-[-0.045em] text-white md:text-6xl"
            >
              {gallery?.title || "Nossos Trabalhos"}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl lg:ml-auto"
          >
            {gallery?.description || "Cada instalação é única. Veja alguns dos projetos que entregamos com qualidade e profissionalismo."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {projects.map((project: any, index: number) => {
            const featured = index === 0 || index === 3;
            return (
              <motion.button
                type="button"
                key={project.src || index}
                initial={{ opacity: 0, y: 34, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.58, delay: index * 0.06 }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left shadow-2xl shadow-black/20 outline-none transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-primary/10 ${
                  featured ? "lg:col-span-6 aspect-[1.35/1]" : "lg:col-span-4 aspect-[1.15/1]"
                }`}
                onClick={() => setLightbox(index)}
                data-testid={`gallery-item-${index}`}
              >
                <img
                  src={project.src}
                  alt={project.alt || project.label || "Projeto realizado"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-0 bg-primary/0 mix-blend-overlay transition-colors group-hover:bg-primary/20" />
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white/80 backdrop-blur-xl ring-1 ring-white/10">
                    Projeto {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-white text-slate-950 opacity-0 shadow-xl transition-all group-hover:scale-100 group-hover:opacity-100">
                    <ZoomIn size={19} />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-primary">WM Soluções</p>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-xl font-black leading-tight text-white md:text-2xl">{project.label}</h3>
                    <ArrowUpRight className="mb-1 flex-shrink-0 text-primary opacity-0 transition-all group-hover:opacity-100" size={22} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && projects[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              onClick={() => setLightbox(null)}
              aria-label={gallery?.closeLabel || "Fechar"}
            >
              <X size={24} />
            </button>

            <button
              className="absolute left-3 z-10 rounded-full border border-white/10 bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-6"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={gallery?.prevLabel || "Anterior"}
            >
              <ChevronLeft size={30} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="mx-12 w-full max-w-6xl md:mx-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/40">
                <img
                  src={projects[lightbox].src}
                  alt={projects[lightbox].alt || projects[lightbox].label || "Projeto realizado"}
                  className="max-h-[76vh] w-full rounded-[1.5rem] object-contain"
                />
              </div>
              <p className="mt-5 text-center text-sm font-black uppercase tracking-[0.18em] text-white/70">
                {projects[lightbox].label}
              </p>
            </motion.div>

            <button
              className="absolute right-3 z-10 rounded-full border border-white/10 bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-6"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={gallery?.nextLabel || "Próximo"}
            >
              <ChevronRight size={30} />
            </button>

            <div className="absolute bottom-6 flex justify-center gap-2">
              {projects.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`h-2 rounded-full transition-all ${
                    i === lightbox ? "w-7 bg-primary" : "w-2 bg-white/35"
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
