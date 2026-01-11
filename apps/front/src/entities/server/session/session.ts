import 'server-only'; // ensure this code can be used only on server side
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { SessionPayload } from './session-payload';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function createSession(userId: string, payload: SessionPayload) {
  const session = await encrypt({ userId, ...payload });
  const cookieStore = await cookies();

  cookieStore.set('next-session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function patchSession(payload: SessionPayload) {
  const session = await getSession();
  const cookieStore = await cookies();
  const sessionEncrypted = await encrypt({
    ...session,
    ...payload,
  });
  cookieStore.set('next-session', sessionEncrypted, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | undefined> {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get('next-session')?.value;
  if (!encryptedSession) return;
  return await decrypt(encryptedSession);
}
