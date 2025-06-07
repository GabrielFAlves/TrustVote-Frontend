import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCandidates } from "@/hooks/blockchain/useCandidates";
import { useVote } from "@/hooks/blockchain/useVote";
import { useAuth, maskCpf, cleanCpf } from "@/hooks/auth/useAuth";

// Interface para candidatos da API
interface ApiCandidate {
  id: number;
  name: string;
  photoUrl: string;
}

// Interface extendida para uso local (mantendo compatibilidade)
interface Candidate extends ApiCandidate {
  party?: string;
  number?: string;
  proposals?: string[];
}

export function Candidates() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  
  // Hooks
  const { data: apiCandidates, isLoading, error, refetch } = useCandidates();
  const { mutate: vote, isPending: isVoting, isSuccess: voteSuccess } = useVote();
  const { user, isAuthenticated } = useAuth();

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('⚠️ Usuário não autenticado, redirecionando...');
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  // Log quando os candidatos forem carregados
  useEffect(() => {
    if (apiCandidates) {
      console.log('Candidatos carregados:', apiCandidates);
    }
  }, [apiCandidates]);

  // Log de erro
  useEffect(() => {
    if (error) {
      console.error('Erro ao carregar candidatos:', error.message);
    }
  }, [error]);

  // Converter candidatos da API para formato local
  const candidates: Candidate[] = apiCandidates?.map(candidate => ({
    ...candidate,
    party: "Partido Blockchain", // Valor padrão
    number: candidate.id.toString(), // Usar ID como número
    proposals: [
      "Transparência total na blockchain",
      "Votação eletrônica segura",
      "Governança descentralizada"
    ] // Propostas padrão
  })) || [];

  const handleVote = () => {
    if (!selectedCandidate) {
      alert("Por favor, selecione um candidato");
      return;
    }

    if (!user?.cpf) {
      alert("Erro: CPF do usuário não encontrado. Faça login novamente.");
      return;
    }

    console.log("Enviando voto:", { 
      cpf: user.cpf, 
      candidateId: selectedCandidate.id,
      candidateName: selectedCandidate.name 
    });
    
    // Enviar voto real para a API (CPF já limpo)
    vote({ cpf: cleanCpf(user.cpf), candidateId: selectedCandidate.id });
  };

  const handleSelectCandidate = (candidate: Candidate) => {
    if (voteSuccess || isVoting) return;
    setSelectedCandidate(candidate);
  };

  // Se não estiver autenticado, não renderizar nada
  if (!isAuthenticated) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Carregando candidatos da blockchain...</p>
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
              <h2 className="text-xl font-bold text-gray-900 mb-2">Erro ao carregar candidatos</h2>
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
  if (!candidates || candidates.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Nenhum candidato encontrado</h2>
              <p className="text-gray-600 mb-4">Ainda não há candidatos registrados para esta eleição.</p>
              <Button onClick={() => refetch()} className="bg-gray-900 hover:bg-black text-white">
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success vote state
  if (voteSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Voto Confirmado!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Seu voto foi registrado com sucesso na blockchain e não pode ser alterado.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Detalhes do Voto:
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src={selectedCandidate?.photoUrl} 
                    alt={selectedCandidate?.name}
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
                  <div className="text-left">
                    <p className="text-gray-600">
                      <strong>Candidato:</strong> {selectedCandidate?.name}<br/>
                      <strong>ID:</strong> {selectedCandidate?.id}<br/>
                      <strong>Eleitor:</strong> {user?.cpf ? maskCpf(user.cpf) : 'N/A'}<br/>
                      <strong>Data/Hora:</strong> {new Date().toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-blue-700">
                    Seu voto foi criptografado e registrado permanentemente na blockchain
                  </span>
                </div>
              </div>

              <Button 
                onClick={() => window.location.href = '/results'} 
                className="bg-gray-900 hover:bg-black text-white"
              >
                Ver Resultados da Eleição
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
            Eleição Municipal 2025
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha seu candidato para prefeito. Seu voto será registrado de
            forma segura e transparente na blockchain.
          </p>
          
          {/* Info do eleitor */}
          {user?.cpf && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-blue-700">
                Eleitor: {maskCpf(user.cpf)}
                {user.name && ` • ${user.name}`}
              </span>
            </div>
          )}
        </div>

        {/* Status da votação */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-900">
                Votação Ativa
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <strong>{candidates.length} candidatos</strong> disponíveis na blockchain
            </div>
          </div>
        </div>

        {/* Grid de candidatos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => handleSelectCandidate(candidate)}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all cursor-pointer hover:shadow-md ${
                selectedCandidate?.id === candidate.id
                  ? "border-green-500 ring-2 ring-green-200 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              } ${(voteSuccess || isVoting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="p-6">
                {/* Foto do candidato */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-200">
                  <img 
                    src={candidate.photoUrl} 
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Informações do candidato */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {candidate.party}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-gray-900 text-white text-lg font-bold rounded">
                    ID: {candidate.id}
                  </div>
                </div>

                {/* Propostas */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Principais propostas:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {candidate.proposals?.map((proposal, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-1">•</span>
                        {proposal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Indicador de seleção */}
                {selectedCandidate?.id === candidate.id && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Selecionado
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Painel de confirmação */}
        {selectedCandidate && !voteSuccess && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={selectedCandidate.photoUrl} 
                  alt={selectedCandidate.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4" style={{display: 'none'}}>
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Confirmar voto para: {selectedCandidate.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ID do Candidato: {selectedCandidate.id}
                  </p>
                  {user?.cpf && (
                    <p className="text-xs text-gray-500">
                      Eleitor: {maskCpf(user.cpf)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCandidate(null)}
                  disabled={isVoting}
                  className="hover:bg-gray-100"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleVote}
                  disabled={isVoting || !user?.cpf}
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  {isVoting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Registrando voto...
                    </>
                  ) : (
                    '🗳️ Confirmar Voto'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Informações sobre segurança */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Seu voto é seguro e anônimo</p>
              <ul className="space-y-1 text-xs">
                <li>• Cada CPF pode votar apenas uma vez</li>
                <li>• Registro imutável na blockchain</li>
                <li>• Verificação transparente dos resultados</li>
                <li>• Impossível rastrear voto até o eleitor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}