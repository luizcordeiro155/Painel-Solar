import { Flame, Instagram, Facebook, Linkedin, MapPin, Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/5531997544806?text=Ol%C3%A1%2C%20WM%20Solu%C3%A7%C3%B5es!%20Gostaria%20de%20um%20or%C3%A7amento.",
      "_blank"
    );
  };

  const navLinks = [
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Sistemas e Serviços", href: "#servicos" },
    { name: "Benefícios", href: "#beneficios" },
    { name: "Como Funciona", href: "#como-funciona" },
    { name: "Dúvidas Frequentes", href: "#faq" },
    { name: "Contato", href: "#contato" },
  ];

  const solutions = [
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

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <a href="#" className="inline-flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform">
                <Flame size={22} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                WM <span className="text-primary">Soluções</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              Especialistas em aquecedores solares para banho e piscina. Equipamentos de alta qualidade, instalação profissional e atendimento humanizado para residências, comércios e condomínios.
            </p>
            <div className="flex gap-3 pt-1">
              {[
                { icon: <Instagram size={17} />, href: "https://www.instagram.com/wm__solucoes/", label: "Instagram" },
      
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Navegação</h3>
            <ul className="space-y-3">
              {navLinks.map(({ name, href }) => (
                <li key={name}>
                  <a href={href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Soluções</h3>
            <ul className="space-y-3">
              {solutions.map(({ name, href }) => (
                <li key={name}>
                  <a href={href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span className="text-sm leading-relaxed">
                  Belo Horizonte — MG<br />
                  e Região Metropolitana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={16} />
                <a href="tel:+5531997544806" className="text-sm hover:text-primary transition-colors">
                  (31) 99754-4806
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={16} />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=wmsolucoessolar@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors break-all"
                >
                  wmsolucoessolar@gmail.com
                </a>
              </li>
              <li className="pt-1">
                <button
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] text-sm font-semibold px-4 py-2 rounded-full transition-all"
                  data-testid="footer-whatsapp-button"
                >
                  <MessageCircle size={15} />
                  Falar no WhatsApp
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>
              &copy; {currentYear}{" "}
              <span className="text-slate-400">WM Soluções — Aquecedores Solares.</span>{" "}
              Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
