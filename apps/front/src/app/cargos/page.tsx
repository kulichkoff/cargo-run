import { CargoModel } from '@/entities/cargo';
import { environment } from '@/env';
import { getFetcher, getQueryClient } from '@/shared/lib';
import { CargosDataTable } from '@/widgets/cargos-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export default async function CargosPage() {
  const fetcher = await getFetcher();
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ['employees'],
      queryFn: async () => {
        return (await fetcher.get(`${environment.apiUrl}/employees`)).data;
      },
    });
    await queryClient.fetchQuery({
      queryKey: ['vehicles'],
      queryFn: async () => {
        return (await fetcher.get(`${environment.apiUrl}/vehicles`)).data;
      },
    });
    await queryClient.fetchQuery({
      queryKey: ['cargos'],
      queryFn: async () => {
        const response = await fetcher.get(`${environment.apiUrl}/cargos`);
        const data: CargoModel[] = response.data;
        return data.map((cargo) => ({
          ...cargo,
          deadlineDate: new Date(cargo.deadlineDate),
          startDate: new Date(cargo.startDate),
        }));
      },
    });
  } catch (error) {
    if ((error as AxiosError).status === 401) {
      redirect('/login');
    }
  }

  return (
    <div className="max-w-5xl sm:px-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CargosDataTable />
      </HydrationBoundary>
    </div>
  );
}
