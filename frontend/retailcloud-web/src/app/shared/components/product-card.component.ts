import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule],
  template: `
    <div class="product-card-enhanced">
      <div class="product-image-container">
        <img [src]="product?.image || product?.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'" 
             [alt]="product?.name || product?.title || 'Product'"
             class="product-image">
      </div>
      
      <div class="product-info">
        <h6 class="product-name">{{ product?.name || product?.title || ('Product ' + (product?.productId || product?.id || '')) }}</h6>
        <div class="product-price">LKR {{ product?.price ?? 0 }}</div>
        <button class="btn btn-add-cart w-100 mt-3"
                (click)="add.emit(product)"
                [disabled]="disabled">
          <i class="bi bi-cart-plus me-2"></i>
          Add to Cart
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-card-enhanced {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      position: relative;
      height: 100%;
    }

    .product-card-enhanced:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .product-image-container {
      position: relative;
      background: #f8f9fa;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card-enhanced:hover .product-image {
      transform: scale(1.1);
    }

    .product-info {
      padding: 20px;
    }

    .product-name {
      font-weight: 700;
      color: #001d3d;
      margin-bottom: 8px;
      font-size: 1rem;
      min-height: 48px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 800;
      color: #001d3d;
      margin-bottom: 5px;
      text-align: right;
    }

    .btn-add-cart {
      background: #001d3d;
      color: white;
      border: none;
      padding: 12px;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .btn-add-cart:hover {
      background: #003566;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 29, 61, 0.3);
    }

    .btn-add-cart:disabled {
      background: #6c757d;
      cursor: not-allowed;
      transform: none;
    }
  `]
})
export class ProductCardComponent {
  @Input() product: any;
  @Input() disabled = false;
  @Output() add = new EventEmitter<any>();
}
