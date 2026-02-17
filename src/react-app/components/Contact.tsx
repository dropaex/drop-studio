import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    budget: "",
    message: "",
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

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          project: "",
          budget: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao enviar. Tente novamente.");
    }

    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contato"
      className="py-28 bg-[#0f0f14] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Gostou do que viu?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Pronto para dar vida ao seu projeto? Vamos conversar e transformar
            sua ideia em algo profissional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* FORM */}
          <div className="bg-[#16161d] border border-white/10 shadow-2xl rounded-3xl p-10">
            <h3 className="text-3xl font-bold text-white mb-8">
              Solicitar Orçamento
            </h3>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center bg-green-500 rounded-full p-5 mb-6">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  Mensagem Enviada!
                </h4>
                <p className="text-white/60">
                  Obrigado pelo contato. Retornarei em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NOME */}
                <div>
                  <label className="block text-sm text-white/70 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-[#1e1e26] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* PROJETO */}
                <div>
                  <label className="block text-sm text-white/70 mb-2">
                    Tipo de Projeto
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-[#1e1e26] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="animacao-2d">Animação 2D</option>
                    <option value="rigging">Loop Rigging</option>
                    <option value="motion-design">Motion Design</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                {/* ORÇAMENTO */}
                <div>
                  <label className="block text-sm text-white/70 mb-2">
                    Orçamento Estimado
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-[#1e1e26] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Ex: R$ 500 - R$ 1000"
                  />
                </div>

                {/* MENSAGEM */}
                <div>
                  <label className="block text-sm text-white/70 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-[#1e1e26] border border-white/10 text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Conte-me mais sobre seu projeto..."
                  />
                </div>

                {/* BOTÃO */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition-all text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  {isLoading ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* CONTATO LATERAL */}
          <div className="space-y-8 text-white/70">
            <h3 className="text-3xl font-bold text-white mb-6">
              Outras Formas de Contato
            </h3>

            <div>
              <span className="text-white font-semibold">Discord:</span>{" "}
              drop_aex
            </div>

            <div>
              <span className="text-white font-semibold">X (Twitter):</span>{" "}
              <a
                href="https://x.com/Drop_aex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition"
              >
                @Drop_aex
              </a>
            </div>

            <div>
              <span className="text-white font-semibold">Behance:</span>{" "}
              <a
                href="https://www.behance.net/drop_aex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition"
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