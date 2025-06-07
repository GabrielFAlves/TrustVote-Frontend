// hooks/useVote.ts
import { useMutation } from "@tanstack/react-query";
import { blockchainService } from "@/services/blockchainService";
import type { VoteData, VoteResponse } from "@/services/blockchainService";
import { toast } from "sonner";

export const useVote = () => {
  return useMutation<VoteResponse, Error, VoteData>({
    mutationFn: blockchainService.vote,
    onSuccess: (data) => {
      toast.success("Voto registrado com sucesso!", {
        description: data.message,
        duration: 120000,
      });
    },
    onError: (error) => {
      toast.error("Erro ao votar", {
        description: error.message,
        duration: 120000,
      });
    },
    retry: false,
  });
};