// services/blockchainService.js
import { httpClient } from '../api/httpClient';

interface Candidate {
  id: number;
  name: string;
  photoUrl: string;
}

export const blockchainService = {
  getCandidates: async (): Promise<Candidate[]> => {
    const response = await httpClient.get<Candidate[]>('/votes/candidates');
    return response.data;
  },

  vote: async (candidateId: number) => {
    const response = await httpClient.post('/votes', {
      candidateId: candidateId
    });
    return response.data;
  },

  getResults: async () => {
    const response = await httpClient.get('/votes/results');
    return response.data;
  },
};