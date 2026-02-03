import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule],
  template: `
    <div class="card h-100 border-0" style="box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s, box-shadow 0.2s;">
      <!-- Product Image -->
      <div style="height: 200px; overflow: hidden; border-radius: 0.375rem 0.375rem 0 0; background-color: #f8f9fa;">
        <img [src]="product?.image || product?.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'" 
             [alt]="product?.name || product?.title || 'Product'"
             style="width: 100%; height: 100%; object-fit: contain; object-position: center;">
      </div>
      
      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-3">{{ product?.name || product?.title || ('Product ' + (product?.productId || product?.id || '')) }}</h5>

        <div class="mt-auto d-flex justify-content-between align-items-center">
          <div class="fw-bold fs-5">
            {{ '$' + (product?.price ?? 0) }}
          </div>

          <button class="btn btn-dark btn-sm"
                  (click)="add.emit(product)"
                  [disabled]="disabled">
            <i class="bi bi-cart-plus me-1"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() product: any;
  @Input() disabled = false;
  @Output() add = new EventEmitter<any>();
}
