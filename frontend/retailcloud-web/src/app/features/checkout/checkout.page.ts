import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-checkout',
  template: `
    <div class="container py-4">
      <div class="p-5 bg-light rounded-4">
        <h1 class="fw-bold">Checkout</h1>
        <p class="text-muted mb-4">Complete your purchase</p>
        <!-- Checkout form will be implemented here -->
      </div>
    </div>
  `,
})
export class CheckoutPage { }
