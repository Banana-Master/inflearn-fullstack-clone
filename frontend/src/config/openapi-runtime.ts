import type {
  CreateClientConfig,
  Config,
  ClientOptions,
} from "@@/generated/openapi-client/client";

import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

const API_URL = process.env.API_URL || "http://localhost:4000";

export const createClientConfig: CreateClientConfig = (
  config?: Config<ClientOptions>,
) => ({
  ...config,
  baseUrl: API_URL,
  async auth() {
    return getCookie(AUTH_COOKIE_NAME, { cookies });
  },
});