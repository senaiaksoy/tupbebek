/// <reference path="../.astro/types.d.ts" />

type D1Database = import('@cloudflare/workers-types').D1Database;

interface RuntimeEnv {
  DB: D1Database;
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

type Runtime = import('@astrojs/cloudflare').Runtime<RuntimeEnv>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface Window {
  __trackLeadConversion?: (eventName: string, params?: Record<string, unknown>) => void;
  __trackGaEvent?: (eventName: string, params?: Record<string, unknown>) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number, position?: string) => string;
  showError: (message: string, duration?: number) => string;
  showSuccess: (message: string, duration?: number) => string;
}
