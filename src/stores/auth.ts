import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiFetch, ApiError } from '@/lib/api';

export interface AuthUser {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  email_verified: boolean;
  phone_verified: boolean;
  type: string | null;
  profile: Record<string, unknown> | null;
}

export interface LoginWithEmailPayload {
  email: string;
  password: string;
  device_name?: string;
}

export interface LoginWithPhonePayload {
  telephone: string;
  password: string;
  device_name?: string;
}

export type LoginPayload = LoginWithEmailPayload | LoginWithPhonePayload;

export interface LoginResponse {
  token?: string;
  token_type?: string;
  requires_phone_verification?: boolean;
  user?: AuthUser;
  message?: string;
  otp_preview?: string | null;
}

export interface VerifyPhonePayload {
  code: string;
  email?: string;
  telephone?: string;
  device_name?: string;
}

export interface RegisterPayload {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  password: string;
  password_confirmation: string;
  type_utilisateur: 'particulier' | 'entreprise' | 'institution';
  nom_entreprise?: string | null;
  type_entreprise?: string | null;
  nom_institution?: string | null;
  type_institution?: string | null;
}

export interface RegisterResponse {
  message: string;
  requires_email_verification: boolean;
  requires_phone_verification: boolean;
  user: AuthUser;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<LoginResponse>;
  verifyPhone: (payload: VerifyPhonePayload) => Promise<LoginResponse>;
  register: (payload: RegisterPayload) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
  clearError: () => void;
}

function resolveErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message?: string }).message ?? 'Une erreur est survenue');
  }

  return 'Une erreur est survenue';
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      clearError: () => set({ error: null }),

      async login(payload) {
        set({ loading: true, error: null });

        try {
          const response = await apiFetch<LoginResponse>('/auth/login', {
            method: 'POST',
            body: { ...payload, device_name: payload.device_name ?? 'cdc-web-client' },
          });

          if (response.token && response.user) {
            set({
              token: response.token,
              user: response.user,
              isAuthenticated: true,
              loading: false,
            });
          } else {
            set({ loading: false });
          }

          return response;
        } catch (error) {
          const message = resolveErrorMessage(error);
          set({ error: message, loading: false, isAuthenticated: get().isAuthenticated });
          throw error;
        }
      },

      async verifyPhone(payload) {
        set({ loading: true, error: null });

        try {
          const response = await apiFetch<LoginResponse>('/auth/phone/verify', {
            method: 'POST',
            body: { ...payload, device_name: payload.device_name ?? 'cdc-web-client' },
          });

          if (response.token && response.user) {
            set({
              token: response.token,
              user: response.user,
              isAuthenticated: true,
            });
          }

          set({ loading: false });
          return response;
        } catch (error) {
          const message = resolveErrorMessage(error);
          set({ error: message, loading: false });
          throw error;
        }
      },

      async register(payload) {
        set({ loading: true, error: null });

        try {
          const response = await apiFetch<RegisterResponse>('/auth/register', {
            method: 'POST',
            body: payload,
          });

          set({ loading: false });
          return response;
        } catch (error) {
          const apiError = error as ApiError;
          const message = resolveErrorMessage(apiError);
          set({ error: message, loading: false });
          throw error;
        }
      },

      async logout() {
        const token = get().token;

        try {
          if (token) {
            await apiFetch('/auth/logout', {
              method: 'POST',
              token,
            });
          }
        } catch (error) {
          // Ignore logout network errors but log them for debugging
          console.warn('Erreur lors de la déconnexion', error);
        } finally {
          set({ token: null, user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'cdc-auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
