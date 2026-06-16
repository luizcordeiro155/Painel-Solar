import { useSiteContent } from "@/lib/siteContent";

export default function Terms() {
  const content = useSiteContent();
  const legal = content?.legal;
  const terms = legal?.terms;
  const contact = content?.contact;
  const sections = terms?.sections || [
    {
      title: "1. Objetivo do site",
      text: "Este site tem como finalidade apresentar informações sobre serviços de aquecimento solar, instalação, manutenção, consultoria técnica e atendimento comercial da WM Soluções.",
    },
    {
      title: "2. Solicitação de orçamento",
      text: "Os formulários, botões de WhatsApp, telefone e e-mail disponíveis no site servem para facilitar o contato entre o usuário e a empresa. O envio de uma solicitação não garante contratação automática, disponibilidade imediata, preço fixo ou aprovação de serviço.",
    },
    {
      title: "3. Informações do site",
      text: "Buscamos manter as informações atualizadas, porém detalhes sobre serviços, valores, prazos, regiões de atendimento e disponibilidade podem sofrer alterações sem aviso prévio.",
    },
    {
      title: "4. Responsabilidades do usuário",
      text: "O usuário se compromete a fornecer informações verdadeiras ao entrar em contato, não utilizar o site para fins ilícitos e não tentar prejudicar o funcionamento da página.",
    },
    {
      title: "5. Propriedade intelectual",
      text: "Textos, imagens, identidade visual, logotipos, elementos gráficos e conteúdos presentes neste site pertencem à WM Soluções ou são utilizados com autorização. A reprodução sem autorização é proibida.",
    },
    {
      title: "6. Links externos",
      text: "O site pode conter links para WhatsApp, Instagram, Gmail ou outros serviços externos. A WM Soluções não se responsabiliza por políticas, funcionamento ou conteúdos de plataformas de terceiros.",
    },
    {
      title: "7. Alterações dos termos",
      text: "Estes Termos de Uso podem ser atualizados a qualquer momento para refletir mudanças nos serviços, no site ou em exigências legais.",
    },
    {
      title: "8. Contato",
      text: "Em caso de dúvidas, entre em contato pelo e-mail:",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-primary hover:underline">{legal?.back || "← Voltar ao site"}</a>

        <h1 className="text-4xl font-black text-white mt-8 mb-6">{terms?.title || "Termos de Uso"}</h1>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p>
            {terms?.intro || "Ao acessar e utilizar o site da WM Soluções Aquecedores Solares, você concorda com estes Termos de Uso."}
          </p>

          {sections.map((section: any, index: number) => (
            <div key={section.title || index}>
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              <p>
                {section.text}{" "}
                {index === sections.length - 1 && (
                  <a className="text-primary hover:underline" href={`mailto:${contact?.email || "wmsolucoessolar@gmail.com"}`}>
                    {contact?.email || "wmsolucoessolar@gmail.com"}
                  </a>
                )}
              </p>
            </div>
          ))}

          <p className="text-sm text-slate-500 pt-8">
            {legal?.lastUpdate || "Última atualização: 2026."}
          </p>
        </div>
      </div>
    </main>
  );
}
