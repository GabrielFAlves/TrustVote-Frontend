import { blockchainService } from "@/services/blockchainService";
import { useQuery } from "@tanstack/react-query";
import type { Result } from "@/services/blockchainService";

export const useResults = () => {
    const query = useQuery<Result[], Error>({
      queryKey: ['electionResults'],
      queryFn: blockchainService.getResults,
      staleTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    });

    return query;
};