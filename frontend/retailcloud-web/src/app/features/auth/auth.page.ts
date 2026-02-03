import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-5">

          <div class="card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">

              <div class="text-center mb-4">
                <div class="display-6 fw-bold">{{ isLoginMode() ? 'Welcome Back' : 'Create Account' }}</div>
                <div class="text-muted">
                  {{ isLoginMode() ? 'Login to your account' : 'Register a new account' }}
                </div>
              </div>

              <!-- Success Message -->
              @if (successMessage()) {
                <div class="alert alert-success alert-dismissible fade show">
                  <i class="bi bi-check-circle me-2"></i>
                  {{ successMessage() }}
                  <button type="button" class="btn-close" (click)="successMessage.set('')"></button>
                </div>
              }

              <!-- Error Message -->
              @if (errorMessage()) {
                <div class="alert alert-danger alert-dismissible fade show">
                  <i class="bi bi-exclamation-triangle me-2"></i>
                  {{ errorMessage() }}
                  <button type="button" class="btn-close" (click)="errorMessage.set('')"></button>
                </div>
              }

              <!-- Confirmation Code Form (After Registration) -->
              @if (needsConfirmation()) {
                <div class="alert alert-info mb-4">
                  <i class="bi bi-envelope me-2"></i>
                  Check your email for the confirmation code!
                </div>

                <form (ngSubmit)="confirmEmail()">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      [(ngModel)]="email" 
                      name="email"
                      readonly
                      required>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Confirmation Code</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      [(ngModel)]="confirmationCode" 
                      name="code"
                      placeholder="Enter 6-digit code"
                      required>
                  </div>

                  <div class="d-grid">
                    <button 
                      type="submit" 
                      class="btn btn-primary btn-lg"
                      [disabled]="loading()">
                      @if (loading()) {
                        <span class="spinner-border spinner-border-sm me-2"></span>
                      }
                      Confirm Email
                    </button>
                  </div>
                </form>

              } @else {
                <!-- Login/Register Form -->
                <form (ngSubmit)="isLoginMode() ? login() : register()">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      [(ngModel)]="email" 
                      name="email"
                      placeholder="your@email.com"
                      required>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input 
                      type="password" 
                      class="form-control" 
                      [(ngModel)]="password" 
                      name="password"
                      placeholder="Enter password"
                      required>
                    @if (!isLoginMode()) {
                      <div class="form-text">
                        Min 8 characters, with uppercase, lowercase, number & special char
                      </div>
                    }
                  </div>

                  <div class="d-grid gap-2">
                    <button 
                      type="submit" 
                      class="btn btn-dark btn-lg"
                      [disabled]="loading()">
                      @if (loading()) {
                        <span class="spinner-border spinner-border-sm me-2"></span>
                      }
                      @if (isLoginMode()) {
                        <i class="bi bi-box-arrow-in-right me-2"></i>
                        Login
                      } @else {
                        <i class="bi bi-person-plus me-2"></i>
                        Register
                      }
                    </button>

                    <button 
                      type="button" 
                      class="btn btn-outline-dark"
                      (click)="toggleMode()"
                      [disabled]="loading()">
                      {{ isLoginMode() ? 'Need an account? Register' : 'Have an account? Login' }}
                    </button>
                  </div>
                </form>
              }

              <hr class="my-4" />

              <div class="small text-muted text-center">
                <i class="bi bi-shield-check me-1"></i>
                Secured with AWS Cognito
              </div>

            </div>
          </div>

          <div class="text-center text-muted small mt-3">
            RetailCloud • Secure Serverless Demo
          </div>

        </div>
      </div>
    </div>
  `,
})
export class AuthPage {
  // Form fields
  email = '';
  password = '';
  confirmationCode = '';

  // UI state
  isLoginMode = signal(true);
  loading = signal(false);
  needsConfirmation = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  toggleMode() {
    this.isLoginMode.set(!this.isLoginMode());
    this.clearMessages();
  }

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please enter email and password');
      return;
    }

    this.loading.set(true);
    this.clearMessages();

    try {
      const result = await this.auth.login(this.email, this.password);

      if (result.success && result.userInfo) {
        this.successMessage.set(`Welcome, ${result.userInfo.email}!`);

        // Redirect to home after 1 second
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.errorMessage.set(result.error || 'Login failed');
      }
    } catch (error: any) {
      this.errorMessage.set(error?.message || 'Login failed');
    } finally {
      this.loading.set(false);
    }
  }

  async register() {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please enter email and password');
      return;
    }

    this.loading.set(true);
    this.clearMessages();

    try {
      const result = await this.auth.register(this.email, this.password);

      if (result.userConfirmed) {
        // Auto-confirmed, can login directly
        this.successMessage.set('Registration successful! You can now login.');
        this.isLoginMode.set(true);
      } else {
        // Needs email confirmation
        this.successMessage.set('Registration successful! Check your email for confirmation code.');
        this.needsConfirmation.set(true);
      }
    } catch (error: any) {
      // Display the detailed error message
      const errorMsg = error?.details || error?.message || 'Registration failed';
      this.errorMessage.set(errorMsg);
    } finally {
      this.loading.set(false);
    }
  }

  async confirmEmail() {
    if (!this.confirmationCode) {
      this.errorMessage.set('Please enter confirmation code');
      return;
    }

    this.loading.set(true);
    this.clearMessages();

    try {
      await this.auth.confirmEmail(this.email, this.confirmationCode);

      this.successMessage.set('Email confirmed! You can now login.');
      this.needsConfirmation.set(false);
      this.isLoginMode.set(true);
      this.confirmationCode = '';
    } catch (error: any) {
      const errorMsg = error?.details || error?.message || 'Confirmation failed';
      this.errorMessage.set(errorMsg);
    } finally {
      this.loading.set(false);
    }
  }

  private clearMessages() {
    this.successMessage.set('');
    this.errorMessage.set('');
  }
}
