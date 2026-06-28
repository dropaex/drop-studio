import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      setIsSubmitted(true);
      setFormData({ name: "", project: "", budget: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-primary-purple mb-6">
            Gostou do que viu?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Pronto para dar vida ao seu projeto? Entre em contato para discutirmos suas necessidades.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-primary-purple/10 to-primary-purple-light/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-purple/20 to-primary-purple-light/20 rounded-full blur-2xl"></div>

            <h3 className="text-3xl font-black text-primary-purple mb-6 relative z-10">
              Solicitar Orçamento
            </h3>

            {isSubmitted ? (
              <div className="text-center py-8 relative z-10">
                <div className="inline-block bg-gradient-to-r from-green-400 to-green-600 rounded-full p-4 mb-4">
                  <CheckCircle className="w-20 h-20 text-white" />
                </div>
                <h4 className="text-2xl font-black text-white mb-2">Mensagem Enviada!</h4>
                <p className="text-white/70 font-semibold">Obrigado pelo contato. Retornarei em breve!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-2">Nome *</label>
                  <input
                    type="text" id="name" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-primary-purple/30 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 text-white placeholder-white/40 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-semibold text-white/90 mb-2">Tipo de Projeto</label>
                  <select id="project" name="project" value={formData.project} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-primary-purple/20 border border-primary-purple/30 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 text-white transition-all"
                    style={{ colorScheme: 'dark' }}>
                    <option value="" className="bg-primary-purple text-white">Selecione uma opção</option>
                    <option value="animacao-2d" className="bg-primary-purple text-white">Animação 2D</option>
                    <option value="rigging" className="bg-primary-purple text-white">Loop Rigging</option>
                    <option value="motion-design" className="bg-primary-purple text-white">Motion Design</option>
                    <option value="outro" className="bg-primary-purple text-white">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-white/90 mb-2">Orçamento Estimado</label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-primary-purple/20 border-2 border-primary-purple/30 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/20 text-white transition-all font-semibold"
                    style={{ colorScheme: 'dark' }}>
                    <option value="" className="bg-primary-purple text-white">Selecione uma opção</option>
                    {formData.project === 'rigging' ? (
                      <option value="loop-10s" className="bg-primary-purple text-white">Loop Animation (10s) — R$300</option>
                    ) : formData.project === 'motion-design' ? (
                      <>
                        <option value="rapido-15s" className="bg-primary-purple text-white">Rápido (15s) — R$250</option>
                        <option value="curto-30s" className="bg-primary-purple text-white">Curto (30s) — R$420</option>
                        <option value="medio-1min" className="bg-primary-purple text-white">Médio (1 min) — R$750</option>
                        <option value="longo-2min" className="bg-primary-purple text-white">Longo (2 min) — R$1.380</option>
                        <option value="estendido-3min" className="bg-primary-purple text-white">Estendido (3 min) — R$1.950</option>
                        <option value="completo-5min" className="bg-primary-purple text-white">Completo (5 min) — R$3.200</option>
                      </>
                    ) : formData.project === 'outro' ? (
                      <option value="flexivel" className="bg-primary-purple text-white">O preço é flexível, variando conforme as especificações do projeto.</option>
                    ) : (
                      <>
                        <option value="rapido-15s" className="bg-primary-purple text-white">Rápido (15s) — R$180</option>
                        <option value="curto-30s" className="bg-primary-purple text-white">Curto (30s) — R$325</option>
                        <option value="medio-1min" className="bg-primary-purple text-white">Médio (1 min) — R$600</option>
                        <option value="longo-2min" className="bg-primary-purple text-white">Longo (2 min) — R$1.350</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white/90 mb-2">Mensagem *</label>
                  <textarea
                    id="message" name="message" required rows={4}
                    value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-primary-purple/30 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 text-white placeholder-white/40 transition-all resize-none"
                    placeholder="Conte-me mais sobre seu projeto..."
                  />
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-purple/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed">
                  <Send size={20} />
                  {isLoading ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-black text-primary-purple mb-6">
                Outras Formas de Contato
              </h3>

              <p className="text-white/80 mb-6">
                Caso necessite ver mais projetos, aqui abaixo está meu{' '}
                <span className="font-bold text-transparent bg-gradient-to-r from-primary-purple to-primary-purple-light bg-clip-text">Behance</span>
              </p>

              <div className="space-y-4">
                {/* Discord */}
                <a
                  href="https://discord.com/users/950790563530166282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 bg-gradient-to-br from-primary-purple/10 to-primary-purple-light/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-purple/30"
                >
                  <div className="bg-gradient-to-br from-primary-purple to-primary-purple-light p-4 rounded-xl shadow-lg">
                    {/* Discord official icon */}
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Discord</div>
                    <div className="text-white/70">drop_aex</div>
                  </div>
                </a>

                {/* X (Twitter) */}
                <div className="flex items-center space-x-4 bg-gradient-to-br from-primary-purple/10 to-primary-purple-light/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-primary-purple to-primary-purple-light p-4 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">X (Twitter)</div>
                    <a href="https://x.com/Drop_aex" className="text-white/70 hover:text-primary-purple transition-colors" target="_blank" rel="noopener noreferrer">@Drop_aex</a>
                  </div>
                </div>

                {/* Behance */}
                <a href="https://www.behance.net/drop_aex" target="_blank" rel="noopener noreferrer"
                  className="flex items-center space-x-4 bg-gradient-to-br from-primary-purple/50 to-primary-purple-light/50 backdrop-blur-sm p-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-purple/50 border-2 border-primary-purple/60 animate-glow-pulse overflow-hidden relative group/behance">
                  <div className="absolute inset-0 -translate-x-full group-hover/behance:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  <div className="bg-gradient-to-br from-primary-purple to-primary-purple-light p-5 rounded-xl shadow-xl shadow-primary-purple/50">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.17 8.3c.38 0 .72.04 1.03.12.31.08.57.21.79.38.22.18.39.4.51.68.12.28.18.61.18.99 0 .42-.1.78-.3 1.07-.2.28-.49.52-.87.71.52.15.91.41 1.17.79.26.38.39.84.39 1.38 0 .42-.08.79-.24 1.11-.16.32-.38.58-.66.8-.28.21-.6.37-.97.47-.37.1-.75.15-1.16.15H5V8.3h4.17zm-.27 3.51c.34 0 .62-.08.84-.25.22-.17.33-.43.33-.79 0-.2-.04-.36-.11-.49-.07-.13-.17-.23-.29-.31-.12-.07-.26-.13-.41-.16-.16-.03-.32-.04-.49-.04H6.8v2.04h2.1zm.1 3.68c.19 0 .37-.02.54-.06.17-.04.31-.11.44-.2.13-.09.22-.21.3-.36.07-.15.11-.33.11-.55 0-.44-.13-.76-.38-.96-.25-.2-.59-.3-1.01-.3H6.8v2.43h2.2zm5.87-.05c.25.24.61.36 1.08.36.34 0 .63-.08.87-.26.25-.17.4-.36.46-.55h1.48c-.24.73-.6 1.26-1.09 1.57-.49.31-1.08.47-1.77.47-.48 0-.91-.08-1.29-.23-.38-.15-.7-.37-.97-.65-.26-.28-.47-.62-.61-1.01-.14-.39-.21-.82-.21-1.29 0-.45.07-.87.22-1.26.15-.38.36-.72.63-1 .27-.28.59-.5.97-.66.38-.16.79-.24 1.24-.24.5 0 .95.1 1.33.29.38.19.69.45.94.78.25.32.43.7.54 1.11.11.41.15.85.12 1.3h-4.4c0 .49.16.88.46 1.27zm1.87-3.42c-.21-.23-.54-.34-.97-.34-.28 0-.52.05-.71.14-.19.1-.34.22-.46.36-.12.14-.2.29-.25.45-.05.16-.08.31-.09.44h2.85c-.06-.45-.19-.82-.37-1.05zm-3.1-4.22h3.73v.88h-3.73v-.88z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg">Behance</div>
                    <div className="text-white/90 font-medium">drop_aex</div>
                  </div>
                  <div className="text-primary-purple-light">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-purple/20 to-primary-purple-light/20 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-blue/30 to-primary-purple/30 rounded-full blur-2xl"></div>
              <h4 className="text-xl font-semibold text-white mb-3 relative z-10">Tempo de Resposta</h4>
              <p className="text-white/70 mb-4 text-sm relative z-10">
                Respondo a todas as mensagens em até 24 horas durante dias úteis.
              </p>
              <div className="space-y-2 text-sm relative z-10">
                <div className="flex justify-between bg-white/10 p-3 rounded-lg">
                  <span className="text-white/70">Orçamentos:</span>
                  <span className="font-semibold text-white">2-3 dias úteis</span>
                </div>
                <div className="flex justify-between bg-white/10 p-3 rounded-lg">
                  <span className="text-white/70">Projetos urgentes:</span>
                  <span className="font-semibold text-white">Consulte disponibilidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}