import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UserInfo {
    sub: string;
    email: string;
    email_verified?: boolean;
    'cognito:username'?: string;
    [key: string]: any;
}

export interface LoginResponse {
    message: string;
    tokens: {
        accessToken: string;
        idToken: string;
        refreshToken: string;
        expiresIn: number;
        tokenType: string;
    };
}

export interface RegisterResponse {
    message: string;
    userConfirmed: boolean;
    userSub: string;
}

export interface ConfirmResponse {
    message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly API_URL = environment.apiUrl || 'https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev';

    // Reactive signals - initialized in constructor
    isLoggedIn = signal<boolean>(false);
    currentUser = signal<UserInfo | null>(null);

    constructor(private http: HttpClient) {
        // Initialize signals after constructor
        this.isLoggedIn.set(this.hasValidToken());
        this.currentUser.set(this.getUserFromToken());
    }

    /**
     * Decode JWT token to extract user information
     */
    private decodeToken(token: string): UserInfo | null {
        try {
            const base64Url = token.split('.')[1];
            if (!base64Url) return null;

            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Failed to decode token:', e);
            return null;
        }
    }

    /**
     * Register a new user
     */
    async register(email: string, password: string): Promise<RegisterResponse> {
        try {
            const url = `${this.API_URL}/auth/register`;
            const body = { email, password };

            console.log('📝 Attempting registration to:', url);
            console.log('📦 Request body:', body);

            const response = await firstValueFrom(
                this.http.post<RegisterResponse>(url, body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            );

            console.log('✅ Registration response:', response);
            return response;
        } catch (error: any) {
            console.error('❌ Registration failed - Full error:', error);
            console.error('❌ Error status:', error?.status);
            console.error('❌ Error message:', error?.message);
            console.error('❌ Error details:', error?.error);

            // Re-throw with better error message
            throw {
                message: error?.error?.message || error?.message || 'Registration failed',
                error: error?.error?.error || 'Unknown error',
                details: error?.error?.details || error?.statusText || 'Please try again'
            };
        }
    }

    /**
     * Confirm email with verification code
     */
    async confirmEmail(email: string, code: string): Promise<ConfirmResponse> {
        const url = `${this.API_URL}/auth/confirm`;
        const body = { email, code };

        const response = await firstValueFrom(
            this.http.post<ConfirmResponse>(url, body)
        );

        return response;
    }

    /**
     * Login with email and password
     */
    async login(email: string, password: string): Promise<{ success: boolean; userInfo: UserInfo | null; error?: string }> {
        try {
            const url = `${this.API_URL}/auth/login`;
            const body = { email, password };

            console.log('🔐 Attempting login to:', url);
            console.log('📦 Request body:', body);

            const response = await firstValueFrom(
                this.http.post<LoginResponse>(url, body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            );

            console.log('📥 Response received:', response);

            if (response.tokens) {
                // Store tokens
                localStorage.setItem('accessToken', response.tokens.accessToken);
                localStorage.setItem('idToken', response.tokens.idToken);
                localStorage.setItem('refreshToken', response.tokens.refreshToken);

                // Decode idToken to get user info (NO API CALL NEEDED!)
                const userInfo = this.decodeToken(response.tokens.idToken);

                if (userInfo) {
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    this.currentUser.set(userInfo);
                    this.isLoggedIn.set(true);

                    console.log('✅ Login successful:', userInfo);
                    return { success: true, userInfo };
                }
            }

            return { success: false, userInfo: null, error: 'Failed to decode user info' };
        } catch (error: any) {
            console.error('❌ Login failed - Full error:', error);
            console.error('❌ Error status:', error?.status);
            console.error('❌ Error message:', error?.message);
            console.error('❌ Error details:', error?.error);

            return {
                success: false,
                userInfo: null,
                error: error?.error?.message || error?.message || 'Login failed'
            };
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            const url = `${this.API_URL}/auth/logout`;

            await firstValueFrom(
                this.http.post(url, {})
            );
        } catch (error) {
            console.error('Logout API call failed:', error);
        } finally {
            // Clear tokens regardless of API call success
            localStorage.removeItem('accessToken');
            localStorage.removeItem('idToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userInfo');

            this.currentUser.set(null);
            this.isLoggedIn.set(false);

            console.log('✅ Logged out successfully');
        }
    }

    /**
     * Get current user info from stored token (no API call!)
     */
    getCurrentUser(): UserInfo | null {
        return this.getUserFromToken();
    }

    /**
     * Get access token for API calls
     */
    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    /**
     * Get ID token
     */
    getIdToken(): string | null {
        return localStorage.getItem('idToken');
    }

    /**
     * Set token (for backward compatibility with Cognito Hosted UI callback)
     */
    setToken(token: string) {
        localStorage.setItem('idToken', token);
        localStorage.setItem('accessToken', token); // Use same token for both

        const userInfo = this.decodeToken(token);
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            this.currentUser.set(userInfo);
        }

        this.isLoggedIn.set(true);
    }

    /**
     * Check if user has valid token
     */
    private hasValidToken(): boolean {
        const token = localStorage.getItem('idToken');
        if (!token) return false;

        const userInfo = this.decodeToken(token);
        if (!userInfo) return false;

        // Check if token is expired
        const exp = userInfo['exp'];
        if (exp && exp * 1000 < Date.now()) {
            console.log('⚠️ Token expired');
            // Don't call logout() here to avoid circular dependency during initialization
            // Just clear the tokens silently
            localStorage.removeItem('accessToken');
            localStorage.removeItem('idToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userInfo');
            return false;
        }

        return true;
    }

    /**
     * Get user info from stored token
     */
    private getUserFromToken(): UserInfo | null {
        const token = localStorage.getItem('idToken');
        if (!token) return null;

        const userInfo = this.decodeToken(token);
        if (!userInfo) return null;

        // Check if token is expired
        const exp = userInfo['exp'];
        if (exp && exp * 1000 < Date.now()) {
            return null;
        }

        return userInfo;
    }

    /**
     * Check if token is expired
     */
    isTokenExpired(): boolean {
        const idToken = this.getIdToken();
        if (!idToken) return true;

        const userInfo = this.decodeToken(idToken);
        if (!userInfo || !userInfo['exp']) return true;

        return userInfo['exp'] * 1000 < Date.now();
    }
}
