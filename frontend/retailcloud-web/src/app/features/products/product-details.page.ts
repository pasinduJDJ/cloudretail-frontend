import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-product-details',
    template: `
    <div class="container py-4">
      <div class="p-5 bg-light rounded-4">
        <h1 class="fw-bold">Product Details</h1>
        <p class="text-muted mb-4">Product ID: {{ productId }}</p>
        <!-- Product details will be implemented here -->
      </div>
    </div>
  `,
})
export class ProductDetailsPage {
    productId: string | null = null;

    constructor(private route: ActivatedRoute) {
        this.productId = this.route.snapshot.paramMap.get('id');
    }
}
