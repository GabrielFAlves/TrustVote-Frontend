import { blockchainService } from "@/services/blockchainService";
import { useQuery } from "@tanstack/react-query";

interface Candidate {
  id: number;
  name: string;
  photoUrl: string;
}

export const useCandidates = () => {
    const query = useQuery<Candidate[], Error>({
      queryKey: ['candidates'],
      queryFn: blockchainService.getCandidates,
      staleTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    });

    return query;
  };