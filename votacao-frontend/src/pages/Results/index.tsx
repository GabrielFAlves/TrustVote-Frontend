import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useResults } from "@/hooks/blockchain/useResults";

export function Results() {
  const [viewMode, setViewMode] = useState<'grid' | 'chart'>('grid');
  const [animateNumbers, setAnimateNumbers] = useState(false);
  
  // Hook para buscar resultados
  const { data: results, isLoading, error, refetch } = useResults();

  // Calcular estatísticas
  const totalVotes = results?.reduce((sum, candidate) => sum + candidate.voteCount, 0) || 0;
  const maxVotes = results ? Math.max(...results.map(c => c.voteCount)) : 0;
  
  // Ordenar candidatos por votos (decrescente)
  const sortedResults = results 
    ? [...results].sort((a, b) => b.voteCount - a.voteCount)
    : [];

  // Animar números quando carregar
  useEffect(() => {
    if (results && results.length > 0) {
      setTimeout(() => setAnimateNumbers(true), 500);
    }
  }, [results]);

  // Calcular porcentagem
  const getPercentage = (votes: number): number => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Carregando resultados da blockchain...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Erro ao carregar resultados</h2>
              <p className="text-gray-600 mb-4">{error.message}</p>
              <Button onClick={() => refetch()} className="bg-gray-900 hover:bg-black text-white">
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!results || results.length === 0 || totalVotes === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Nenhum voto registrado</h2>
              <p className="text-gray-600 mb-4">A eleição ainda não recebeu votos.</p>
              <Button onClick={() => refetch()} className="bg-gray-900 hover:bg-black text-white">
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header da página */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Resultados da Eleição
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resultados em tempo real registrados na blockchain de forma transparente e imutável.
          </p>
        </div>

        {/* Estatísticas gerais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {animateNumbers ? totalVotes : 0}
            </div>
            <div className="text-sm text-gray-600">Total de Votos</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {results.length}
            </div>
            <div className="text-sm text-gray-600">Candidatos</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              100%
            </div>
            <div className="text-sm text-gray-600">Transparência</div>
          </div>
        </div>

        {/* Toggle de visualização */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 flex">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="px-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </Button>
            <Button
              variant={viewMode === 'chart' ? 'default' : 'ghost'}
              onClick={() => setViewMode('chart')}
              className="px-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Gráfico
            </Button>
          </div>
        </div>

        {/* Visualização Grid */}
        {viewMode === 'grid' && (
          <div className="space-y-4">
            {sortedResults.map((candidate, index) => (
              <div
                key={candidate.id}
                className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${
                  index === 0 ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-white' :
                  index === 1 ? 'border-gray-400 bg-gradient-to-r from-gray-50 to-white' :
                  index === 2 ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-white' :
                  'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Posição */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-lg font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>

                    {/* Foto do candidato */}
                    <img 
                      src={candidate.photoUrl} 
                      alt={candidate.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4" style={{display: 'none'}}>
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>

                    {/* Info do candidato */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">ID: {candidate.id}</p>
                    </div>
                  </div>

                  {/* Resultados */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {animateNumbers ? candidate.voteCount : 0}
                    </div>
                    <div className="text-lg text-gray-600 mb-2">
                      {getPercentage(candidate.voteCount)}%
                    </div>
                    
                    {/* Barra de progresso */}
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-2000 ${
                          index === 0 ? 'bg-yellow-400' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-400' :
                          'bg-blue-400'
                        }`}
                        style={{
                          width: animateNumbers ? `${(candidate.voteCount / maxVotes) * 100}%` : '0%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visualização Chart */}
        {viewMode === 'chart' && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Distribuição de Votos
            </h3>
            
            <div className="space-y-6">
              {sortedResults.map((candidate, index) => (
                <div key={candidate.id} className="flex items-center">
                  {/* Info do candidato */}
                  <div className="flex items-center w-48 mr-6">
                    <img 
                      src={candidate.photoUrl} 
                      alt={candidate.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3" style={{display: 'none'}}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{candidate.name}</div>
                      <div className="text-xs text-gray-500">ID: {candidate.id}</div>
                    </div>
                  </div>

                  {/* Barra horizontal */}
                  <div className="flex-1 mr-4">
                    <div className="bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div 
                        className={`h-8 rounded-full transition-all duration-2000 flex items-center justify-end pr-3 text-white text-sm font-medium ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                          index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                          index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                          'bg-gradient-to-r from-blue-400 to-blue-500'
                        }`}
                        style={{
                          width: animateNumbers ? `${getPercentage(candidate.voteCount)}%` : '0%'
                        }}
                      >
                        {getPercentage(candidate.voteCount) > 15 && `${getPercentage(candidate.voteCount)}%`}
                      </div>
                    </div>
                  </div>

                  {/* Número de votos */}
                  <div className="w-16 text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {animateNumbers ? candidate.voteCount : 0}
                    </div>
                    <div className="text-xs text-gray-500">votos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Informações sobre a blockchain */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-700">
              <h4 className="font-semibold mb-2">Transparência Blockchain</h4>
              <ul className="space-y-1 text-xs">
                <li>• Todos os votos são registrados de forma imutável na blockchain</li>
                <li>• Resultados em tempo real e verificáveis publicamente</li>
                <li>• Impossível alterar ou falsificar votos após registro</li>
                <li>• Sistema descentralizado e auditável</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            onClick={() => refetch()}
            variant="outline"
            className="px-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar Resultados
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/candidates'}
            className="bg-green-600 hover:bg-green-700 px-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Voltar para Votação
          </Button>
        </div>
      </div>
    </div>
  );
}