import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    standalone: true,
    template: `
    <div class="container py-5 text-center">
      <div class="spinner-border"></div>
      <p class="mt-3">Signing you in...</p>
    </div>
  `,
})
export class AuthCallbackPage implements OnInit {
    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        console.log('🔄 Auth Callback - Processing Cognito response...');

        // Cognito returns tokens in URL hash (after #)
        const hash = window.location.hash.substring(1);
        console.log('📍 URL Hash:', hash);

        const params = new URLSearchParams(hash);

        // Extract tokens
        const idToken = params.get('id_token');
        const accessToken = params.get('access_token');
        const error = params.get('error');
        const errorDescription = params.get('error_description');

        console.log('🎫 ID Token:', idToken ? 'Found ✅' : 'Missing ❌');
        console.log('🔑 Access Token:', accessToken ? 'Found ✅' : 'Missing ❌');

        // Check for errors
        if (error) {
            console.error('❌ Cognito Error:', error, errorDescription);
            alert(`Authentication failed: ${errorDescription || error}`);
            this.router.navigateByUrl('/auth');
            return;
        }

        // Save token and redirect
        if (idToken) {
            console.log('✅ Login successful! Saving token and redirecting...');
            this.auth.setToken(idToken);
            this.router.navigateByUrl('/');
        } else {
            console.error('❌ No ID token found in callback');
            alert('Authentication failed: No token received from Cognito');
            this.router.navigateByUrl('/auth');
        }
    }
}
