import { createSession, patchSession } from '@/entities/server/session';
import { environment } from '@/env';

export async function POST(request: Request) {
  const credentials = await request.json();
  console.log('body', credentials);
  // Call API
  const resp = await fetch(`${environment.apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  });

  const { accessToken } = await resp.json();
  // On response, create session with username and accessToken
  await patchSession({
    userId: credentials.username,
    accessToken,
  });

  // Return accessToken to client
  return Response.json({
    accessToken,
  });
}
