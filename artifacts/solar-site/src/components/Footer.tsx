import { Instagram, MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { useSiteContent, telUrl, whatsappUrl } from "@/lib/siteContent";

export default function Footer() {
  const content = useSiteContent();
  const currentYear = new Date().getFullYear();
  const brand = content?.brand;
  const contact = content?.contact;
  const footer = content?.footer;

  const handleWhatsApp = () => {
    window.open(
      whatsappUrl(contact?.phoneRaw || "5531997544806", contact?.whatsappMessageOffer || contact?.whatsappMessage || "Olá, WM Soluções! Gostaria de um orçamento."),
      "_blank"
    );
  };

  const navLinks = footer?.navLinks?.length
    ? footer.navLinks
    : [
        { name: "Sobre Nós", href: "#sobre" },
        { name: "Sistemas e Serviços", href: "#servicos" },
        { name: "Benefícios", href: "#beneficios" },
        { name: "Como Funciona", href: "#como-funciona" },
        { name: "Dúvidas Frequentes", href: "#faq" },
        { name: "Contato", href: "#contato" },
      ];

  const solutions = footer?.solutions?.length
    ? footer.solutions
    : [
        { name: "Sistema Convencional", href: "#servicos" },
        { name: "Sistema a Vácuo", href: "#servicos" },
        { name: "Aquecimento de Piscinas", href: "#servicos" },
        { name: "Instalação Profissional", href: "#servicos" },
        { name: "Manutenção Preventiva", href: "#servicos" },
        { name: "Consultoria Técnica", href: "#servicos" },
      ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <a href="/" className="inline-flex items-center gap-3 group">
              <img
                src={brand?.logo || "/logo.png"}
                alt={brand?.name || "WM Soluções"}
                className="h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform"
              />

              <span className="text-xl font-black tracking-tight text-white">
                {brand?.namePart1 || "WM"} <span className="text-primary">{brand?.namePart2 || "Soluções"}</span>
              </span>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed">
              {footer?.description || "Especialistas em aquecedores solares para banho e piscina. Equipamentos de alta qualidade, instalação profissional e atendimento humanizado para residências, comércios e condomínios."}
            </p>

            <div className="flex gap-3 pt-1">
              <a
                href={contact?.instagram || "https://www.instagram.com/wm__solucoes/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">
              {footer?.navTitle || "Navegação"}
            </h3>

            <ul className="space-y-3">
              {navLinks.map(({ name, href }: any) => (
                <li key={name}>
                  <a
                    href={href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">
              {footer?.solutionTitle || "Soluções"}
            </h3>

            <ul className="space-y-3">
              {solutions.map(({ name, href }: any) => (
                <li key={name}>
                  <a
                    href={href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">
              {footer?.contactTitle || "Contato"}
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="text-primary flex-shrink-0 mt-0.5"
                  size={16}
                />
                <span className="text-sm leading-relaxed">
                  {contact?.city || "Belo Horizonte — MG"}
                  <br />{contact?.region || "e Região Metropolitana"}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={16} />
                <a
                  href={telUrl(contact?.phoneRaw || "5531997544806")}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {contact?.phone || "(31) 99754-4806"}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={16} />
                <a
                  href={`mailto:${contact?.email || "wmsolucoessolar@gmail.com"}?subject=Orçamento%20WM%20Soluções&body=Olá,%20gostaria%20de%20solicitar%20um%20orçamento.`}
                  className="text-sm hover:text-primary transition-colors break-all"
                >
                  {contact?.email || "wmsolucoessolar@gmail.com"}
                </a>
              </li>

              <li className="pt-1">
                <button
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] text-sm font-semibold px-4 py-2 rounded-full transition-all"
                  data-testid="footer-whatsapp-button"
                >
                  <MessageCircle size={15} />
                  {footer?.whatsappButton || "Falar no WhatsApp"}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>
              &copy; {currentYear}{" "}
              <span className="text-slate-400">
                {footer?.copyright || "WM Soluções — Aquecedores Solares."}
              </span>{" "}
              {footer?.rights || "Todos os direitos reservados."}
            </p>

            <div className="flex gap-6">
              <a
                href="/termos-de-uso"
                className="hover:text-slate-400 transition-colors"
              >
                {footer?.termsLabel || "Termos de Uso"}
              </a>

              <a
                href="/politica-de-privacidade"
                className="hover:text-slate-400 transition-colors"
              >
                {footer?.privacyLabel || "Política de Privacidade"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
