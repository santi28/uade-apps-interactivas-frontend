export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'doctor' | 'secretary';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Credenciales estáticas (simula backend)
const STATIC_CREDENTIALS = {
  email: 'admin',
  password: 'admin'
};

// Usuario simulado
const MOCK_USER: User = {
  id: '1',
  email: 'admin@droscaldo.com.ar',
  name: 'Dr. Osvaldo Méndez',
  role: 'admin' as const
};

// Simular JWT (en el backend real esto sería generado por el servidor)
function generateMockToken(user: User): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
  };

  // En producción sería un JWT real firmado
  return btoa(JSON.stringify(payload));
}

function decodeMockToken(token: string): any | null {
  try {
    const payload = JSON.parse(atob(token));

    // Verificar si el token expiró
    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// Manejo de cookies (client-side)
export const cookieUtils = {
  set(name: string, value: string, days: number = 7) {
    if (typeof document !== 'undefined') {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
    }
  },

  get(name: string): string | null {
    if (typeof document !== 'undefined') {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');

      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },

  remove(name: string) {
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  }
};

// Funciones de autenticación
export const authService = {
  // Login simulado
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
      const token = generateMockToken(MOCK_USER);

      // Guardar en cookies
      cookieUtils.set('auth_token', token, 7);
      cookieUtils.set('user_data', JSON.stringify(MOCK_USER), 7);

      return {
        success: true,
        user: MOCK_USER,
        token
      };
    }

    return {
      success: false,
      error: 'Credenciales inválidas'
    };
  },

  // Logout
  logout(): void {
    cookieUtils.remove('auth_token');
    cookieUtils.remove('user_data');
  },

  // Verificar autenticación desde cookies
  getAuthState(): AuthState {
    const token = cookieUtils.get('auth_token');
    const userData = cookieUtils.get('user_data');

    if (!token || !userData) {
      return {
        isAuthenticated: false,
        user: null,
        token: null
      };
    }

    // Verificar validez del token
    const tokenPayload = decodeMockToken(token);
    if (!tokenPayload) {
      // Token inválido o expirado
      this.logout();
      return {
        isAuthenticated: false,
        user: null,
        token: null
      };
    }

    try {
      const user = JSON.parse(userData);
      return {
        isAuthenticated: true,
        user,
        token
      };
    } catch {
      this.logout();
      return {
        isAuthenticated: false,
        user: null,
        token: null
      };
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getAuthState().isAuthenticated;
  },

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return this.getAuthState().user;
  }
};