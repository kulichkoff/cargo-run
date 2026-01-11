import {
  MutationCache,
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

function makeQueryClient(opts?: ClientOptions) {
  return new QueryClient({
    queryCache: opts?.queryCache,
    mutationCache: opts?.mutationCache,
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          if ((error as AxiosError).status === 401) {
            return false;
          }
          return failureCount < 3;
        },
      },
      mutations: {
        retry: (failureCount, error) => {
          if ((error as AxiosError).status === 401) {
            return false;
          }
          return failureCount < 3;
        },
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export interface ClientOptions {
  queryCache?: QueryCache;
  mutationCache?: MutationCache;
}

export function getQueryClient(opts?: ClientOptions) {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient(opts);
    return browserQueryClient;
  }
}
