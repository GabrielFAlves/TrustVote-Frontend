import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
    <Header />
    
    {/* Hero Section */}
    <section className="flex-1 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Votação Segura e <span className="text-gray-600">Transparente</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              TrustVote revoluciona o processo eleitoral com tecnologia blockchain, 
              garantindo transparência, segurança e confiabilidade em cada voto.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button className="bg-gray-900 hover:bg-black text-white px-8 py-3 text-lg">
                Começar a Votar
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg">
                Saiba Mais
              </Button>
            </div>
          </div>
          
          {/* Hero Illustration */}
          <div className="flex justify-center">
            <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto">
              {/* Background */}
              <rect width="400" height="300" fill="url(#heroGradient)" rx="20"/>
              
              {/* Blockchain blocks */}
              <g>
                <rect x="50" y="80" width="60" height="40" fill="#374151" rx="6"/>
                <rect x="130" y="80" width="60" height="40" fill="#4B5563" rx="6"/>
                <rect x="210" y="80" width="60" height="40" fill="#6B7280" rx="6"/>
                <rect x="290" y="80" width="60" height="40" fill="#9CA3AF" rx="6"/>
                
                {/* Connection lines */}
                <line x1="110" y1="100" x2="130" y2="100" stroke="#374151" strokeWidth="3"/>
                <line x1="190" y1="100" x2="210" y2="100" stroke="#374151" strokeWidth="3"/>
                <line x1="270" y1="100" x2="290" y2="100" stroke="#374151" strokeWidth="3"/>
              </g>
              
              {/* Vote boxes */}
              <g>
                <rect x="80" y="160" width="80" height="60" fill="white" stroke="#D1D5DB" strokeWidth="2" rx="8"/>
                <rect x="240" y="160" width="80" height="60" fill="white" stroke="#D1D5DB" strokeWidth="2" rx="8"/>
                
                {/* Check marks in vote boxes */}
                <path d="M105 185 L115 195 L135 175" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M265 185 L275 195 L295 175" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              
              {/* Security shield */}
              <g transform="translate(180, 40)">
                <path d="M20 0 L35 8 L35 25 C35 35 20 45 20 45 C20 45 5 35 5 25 L5 8 Z" fill="#374151"/>
                <path d="M13 20 L18 25 L27 16" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9FAFB"/>
                  <stop offset="100%" stopColor="#E5E7EB"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Por que escolher o TrustVote?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Blockchain</h3>
            <p className="text-gray-600">
              Tecnologia blockchain garante que cada voto seja criptografado e imutável, 
              eliminando fraudes e manipulações.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparência</h3>
            <p className="text-gray-600">
              Todos os votos são verificáveis publicamente, 
              garantindo a transparência do processo.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Rapidez</h3>
            <p className="text-gray-600">
              Resultados em tempo real com contagem automática, 
              eliminando demoras e erros humanos.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* How it Works Section */}
    <section className="py-16 bg-white border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Como Funciona
        </h2>
        <div className="max-w-4xl mx-auto">
          <svg viewBox="0 0 800 200" className="w-full h-auto mb-8">
            {/* Step 1 */}
            <g>
              <circle cx="100" cy="100" r="40" fill="#F3F4F6" stroke="#374151" strokeWidth="2"/>
              <text x="100" y="105" textAnchor="middle" className="text-lg font-bold fill-gray-900">1</text>
              <text x="100" y="160" textAnchor="middle" className="text-sm fill-gray-600">Registro</text>
            </g>
            
            {/* Arrow 1 */}
            <path d="M150 100 L190 100" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            
            {/* Step 2 */}
            <g>
              <circle cx="250" cy="100" r="40" fill="#F3F4F6" stroke="#374151" strokeWidth="2"/>
              <text x="250" y="105" textAnchor="middle" className="text-lg font-bold fill-gray-900">2</text>
              <text x="250" y="160" textAnchor="middle" className="text-sm fill-gray-600">Votação</text>
            </g>
            
            {/* Arrow 2 */}
            <path d="M300 100 L340 100" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            
            {/* Step 3 */}
            <g>
              <circle cx="400" cy="100" r="40" fill="#F3F4F6" stroke="#374151" strokeWidth="2"/>
              <text x="400" y="105" textAnchor="middle" className="text-lg font-bold fill-gray-900">3</text>
              <text x="400" y="160" textAnchor="middle" className="text-sm fill-gray-600">Blockchain</text>
            </g>
            
            {/* Arrow 3 */}
            <path d="M450 100 L490 100" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            
            {/* Step 4 */}
            <g>
              <circle cx="550" cy="100" r="40" fill="#F3F4F6" stroke="#374151" strokeWidth="2"/>
              <text x="550" y="105" textAnchor="middle" className="text-lg font-bold fill-gray-900">4</text>
              <text x="550" y="160" textAnchor="middle" className="text-sm fill-gray-600">Verificação</text>
            </g>
            
            {/* Arrow 4 */}
            <path d="M600 100 L640 100" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            
            {/* Step 5 */}
            <g>
              <circle cx="700" cy="100" r="40" fill="#374151"/>
              <text x="700" y="105" textAnchor="middle" className="text-lg font-bold fill-white">5</text>
              <text x="700" y="160" textAnchor="middle" className="text-sm fill-gray-600">Resultado</text>
            </g>
            
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF"/>
              </marker>
            </defs>
          </svg>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center text-sm text-gray-600">
            <div>Usuário se registra na plataforma</div>
            <div>Eleitor faz sua escolha</div>
            <div>Voto é gravado na blockchain</div>
            <div>Sistema verifica integridade</div>
            <div>Resultado transparente</div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
  )
} 