import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSystemConfigFn } from "@/features/config/config.api";

import { CONFIG_KEYS, systemConfigQuery } from "@/features/config/queries";

export function useSystemSetting() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(systemConfigQuery);

  const saveMutation = useMutation({
    mutationFn: updateSystemConfigFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONFIG_KEYS.system });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    settings: data,
    isLoading,
    saveSettings: saveMutation.mutateAsync,
  };
}
