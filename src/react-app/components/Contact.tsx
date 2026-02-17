import { useState } from 'react';
import { MessageCircle, Send, CheckCircle } from 'lucide-react';

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar");
    }

    setIsSubmitted(true);

    setFormData({
      name: "",
      project: "",
      budget: "",
      message: "",
    });

    setTimeout(() => setIsSubmitted(false), 3000);
  } catch (error) {
    alert("Erro ao enviar mensagem. Tente novamente.");
  } finally {
    setIsLoading(false);
};

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar");
    }

    setIsSubmitted(true);

    setFormData({
      name: "",
      project: "",
      budget: "",
      message: "",
    });

    setTimeout(() => setIsSubmitted(false), 3000);
  } catch (error) {
    alert("Erro ao enviar mensagem. Tente novamente.");
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                <h4 className="text-2xl font-black text-white mb-2">
                  Mensagem Enviada!
                </h4>
                <p className="text-white/70 font-semibold">
                  Obrigado pelo contato. Retornarei em breve!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-primary-purple/30 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 text-white placeholder-white/40 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-semibold text-white/90 mb-2">
                    Tipo de Projeto
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-primary-purple/20 border border-primary-purple/30 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 text-white transition-all"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" className="bg-primary-purple text-white">Selecione uma opção</option>
                    <option value="animacao-2d" className="bg-primary-purple text-white">Animação 2D</option>
                    <option value="rigging" className="bg-primary-purple text-white">Loop Rigging</option>
                    <option value="motion-design" className="bg-primary-purple text-white">Motion Design</option>
                    <option value="outro" className="bg-primary-purple text-white">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-white/90 mb-2">
                    Orçamento Estimado
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-primary-purple/20 border-2 border-primary-purple/30 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/20 text-white transition-all font-semibold"
                    style={{ colorScheme: 'dark' }}
                  >
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
                  <label htmlFor="message" className="block text-sm font-semibold text-white/90 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-primary-purple/30 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 text-white placeholder-white/40 transition-all resize-none"
                    placeholder="Conte-me mais sobre seu projeto..."
                  />
                </div>

                <button
  type="submit"
  disabled={isLoading}
  className="w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-purple/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
>
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
                Caso necessite ver mais projetos, aqui abaixo está meu <span className="font-bold text-transparent bg-gradient-to-r from-primary-purple to-primary-purple-light bg-clip-text">Behance</span>
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-gradient-to-br from-primary-purple/10 to-primary-purple-light/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-primary-purple to-primary-purple-light p-4 rounded-xl shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Discord</div>
                    <div className="text-white/70">drop_aex</div>
                  </div>
                </div>

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

                <a href="https://www.behance.net/drop_aex" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 bg-gradient-to-br from-primary-purple/50 to-primary-purple-light/50 backdrop-blur-sm p-5 rounded-xl transition-all duration-300 hover:scale-102 hover:shadow-2xl hover:shadow-primary-purple/50 border-2 border-primary-purple/60 animate-glow-pulse overflow-hidden relative group/behance">
                  <div className="absolute inset-0 -translate-x-full group-hover/behance:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  <div className="bg-gradient-to-br from-primary-purple to-primary-purple-light p-5 rounded-xl shadow-xl shadow-primary-purple/50">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.5 4.5h11v15h-11v-15zM8 6v12h8V6H8zm2.5 1.5h3v1.5h-3V7.5zm0 3h3V12h-3v-1.5zm0 3h3v1.5h-3V13.5z" />
                      <path d="M22 7.5v9c0 1.381-1.119 2.5-2.5 2.5h-15C3.119 19 2 17.881 2 16.5v-9C2 6.119 3.119 5 4.5 5h15C20.881 5 22 6.119 22 7.5z" />
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
              
              <h4 className="text-xl font-semibold text-white mb-3 relative z-10">
                Tempo de Resposta
              </h4>
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
