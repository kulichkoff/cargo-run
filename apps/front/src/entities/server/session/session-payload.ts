import { JWTPayload } from 'jose';

export interface SessionPayload extends JWTPayload {
  accessToken?: string;
  preferredTheme?: string;
}
