import axios from 'axios';
import { cookies } from 'next/headers';

export async function getFetcher() {
  const cookieStore = await cookies();
  const cookiesList = [
    cookieStore.get('cgr-access'),
    cookieStore.get('cgr-refresh'),
  ].filter(Boolean);

  const cookiesHeader = cookiesList
    .map((c) => `${c!.name}=${c!.value}`)
    .join('; ');

  return axios.create({
    headers: {
      cookie: cookiesHeader,
    },
  });
}
