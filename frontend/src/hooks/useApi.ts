'use client';

import { getCookie } from 'cookies-next/client';
import * as api from '@/lib/api';

const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

export function useApi() {
  const token = getCookie(AUTH_COOKIE_NAME) as string;

  return {
    getUserTest: () => api.getUserTest(token),
  }
}