import { clientAxios } from '@/shared/lib/client-fetcher';
import { DeliveryModel } from './delivery.model';
import { PaginatedResponse } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

async function fetchDeliveries(
  page: number,
  pageSize: number,
): Promise<PaginatedResponse<DeliveryModel>> {
  const { data } = await clientAxios.get<PaginatedResponse<DeliveryModel>>(
    '/deliveries',
    {
      params: {
        page,
        pageSize,
      },
    },
  );
  return {
    ...data,
    hits: data.hits.map((delivery: DeliveryModel) => ({
      ...delivery,
      deliveryDeadline: new Date(delivery.deliveryDeadline),
      pickupTime: delivery.pickupTime ? new Date(delivery.pickupTime) : null,
    })),
  };
}

export const useDeliveries = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['deliveries', { page, pageSize }],
    queryFn: () => fetchDeliveries(page, pageSize),
  });
};
