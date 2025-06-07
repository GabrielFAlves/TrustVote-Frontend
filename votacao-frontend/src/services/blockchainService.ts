// services/blockchainService.js
import { httpClient } from '../api/httpClient';

interface Candidate {
  id: number;
  name: string;
  photoUrl: string;
}

export interface Result {
    id: number;
    name: string;
    photoUrl: string;
    voteCount: number;
  }

export interface VoteData {
  cpf: string;
  candidateId: number;
}

export interface VoteResponse {
  message: string;
}

export const blockchainService = {
  getCandidates: async (): Promise<Candidate[]> => {
    const response = await httpClient.get<Candidate[]>('/votes/candidates');
    return response.data;
  },

  vote: async (voteData: VoteData): Promise<VoteResponse> => {
    const response = await httpClient.post<VoteResponse>('/votes/send', voteData);
    return response.data;
  },

  getResults: async (): Promise<Result[]> => {
    const response = await httpClient.get<Result[]>('/votes/results');
    return response.data;
  },
};