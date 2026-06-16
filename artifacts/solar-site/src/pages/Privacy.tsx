import { useSiteContent } from "@/lib/siteContent";

export default function Privacy() {
  const content = useSiteContent();
  const legal = content?.legal;
  const privacy = legal?.privacy;
  const contact = content?.contact;
  const sections = privacy?.sections || [
    {
      title: "1. Dados que podemos coletar",
      text: "Podemos coletar informações fornecidas voluntariamente pelo usuário, como nome, telefone, e-mail, cidade, mensagem enviada, interesse em orçamento e demais dados necessários para atendimento.",
    },
    {
      title: "2. Como usamos os dados",
      text: "Os dados são utilizados para responder solicitações, enviar orçamentos, prestar atendimento, agendar serviços, tirar dúvidas e melhorar a comunicação com clientes e interessados.",
    },
    {
      title: "3. Compartilhamento de informações",
      text: "A WM Soluções não vende dados pessoais. Informações podem ser compartilhadas apenas quando necessário para atendimento, cumprimento de obrigações legais ou operação dos serviços contratados.",
    },
    {
      title: "4. Cookies e tecnologias de navegação",
      text: "O site pode utilizar cookies ou ferramentas de análise para entender o uso da página, melhorar a experiência do usuário e acompanhar o desempenho das campanhas e conteúdos.",
    },
    {
      title: "5. WhatsApp, Instagram e e-mail",
      text: "Ao clicar em botões de contato, o usuário pode ser direcionado para plataformas externas, como WhatsApp, Instagram ou Gmail. Essas plataformas possuem políticas próprias de privacidade e uso.",
    },
    {
      title: "6. Segurança dos dados",
      text: "Adotamos medidas razoáveis para proteger as informações recebidas, evitando acessos não autorizados, uso indevido, perda ou alteração indevida dos dados.",
    },
    {
      title: "7. Direitos do usuário",
      text: "O usuário pode solicitar acesso, correção, atualização ou exclusão de seus dados pessoais entrando em contato pelo e-mail informado nesta política.",
    },
    {
      title: "8. Retenção das informações",
      text: "As informações podem ser mantidas pelo tempo necessário para atendimento, relacionamento comercial, cumprimento de obrigações legais ou defesa de direitos.",
    },
    {
      title: "9. Alterações nesta política",
      text: "Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que o usuário consulte esta página sempre que desejar.",
    },
    {
      title: "10. Contato",
      text: "Para dúvidas ou solicitações relacionadas à privacidade, entre em contato pelo e-mail:",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-primary hover:underline">{legal?.back || "← Voltar ao site"}</a>

        <h1 className="text-4xl font-black text-white mt-8 mb-6">{privacy?.title || "Política de Privacidade"}</h1>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p>
            {privacy?.intro || "Esta Política de Privacidade explica como a WM Soluções Aquecedores Solares trata as informações fornecidas por usuários que acessam o site ou entram em contato conosco."}
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
