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
      const response = await fetch('https://www.dropstudio.online/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          project: '',
          budget: '',
          message: ''
        });

        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert('Erro ao enviar. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao enviar. Tente novamente.');
    }

    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
          <div className="bg-gradient-to-br from-primary-purple/10 to-primary-purple-light/10 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden">
            <h3 className="text-3xl font-black text-primary-purple mb-6">
              Solicitar Orçamento
            </h3>

            {isSubmitted ? (
              <div className="text-center py-8">
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
              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-primary-purple/30 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 text-white placeholder-white/40"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Tipo de Projeto
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-primary-purple/20 border border-primary-purple/30 text-white"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Animação 2D">Animação 2D</option>
                    <option value="Rigging">Loop Rigging</option>
                    <option value="Motion Design">Motion Design</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Orçamento Estimado
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-primary-purple/30 text-white"
                    placeholder="Ex: R$ 500 - R$ 1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-primary-purple/30 text-white resize-none"
                    placeholder="Conte-me mais sobre seu projeto..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-all disabled:opacity-70"
                >
                  {isLoading ? "Enviando..." : (
                    <>
                      <Send size={20} />
                      Enviar Mensagem
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* Lado direito mantido como estava */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black text-primary-purple mb-6">
              Outras Formas de Contato
            </h3>

            <div className="text-white/80">
              Discord: <span className="font-semibold">drop_aex</span>
            </div>

            <div className="text-white/80">
              X (Twitter): 
              <a
                href="https://x.com/Drop_aex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-purple ml-1"
              >
                @Drop_aex
              </a>
            </div>

            <div className="text-white/80">
              Behance:
              <a
                href="https://www.behance.net/drop_aex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-purple ml-1"
              >
                drop_aex
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}