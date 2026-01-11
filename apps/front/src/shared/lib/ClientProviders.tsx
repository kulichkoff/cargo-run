'use client';

import {
  MutationCache,
  QueryCache,
  QueryClientProvider,
} from '@tanstack/react-query';
import { getQueryClient } from './query-client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const queryClient = getQueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if ((error as AxiosError).status === 401) {
          router.replace('/login');
          return;
        }
        console.error('Query error', error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variables, onMutateResult, mutation, context) => {
        if ((error as AxiosError).status === 401) {
          router.replace('/login');
          return;
        }
        console.error('Mutation error', error);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
