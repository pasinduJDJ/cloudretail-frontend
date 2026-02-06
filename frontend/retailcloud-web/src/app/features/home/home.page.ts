import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.page.html',
  styles: [`
    /* ===== PROMOTIONAL BANNER ===== */
    .promo-banner {
      background: linear-gradient(90deg, #ffc004 0%, #ffb700 100%);
      color: #001d3d;
      padding: 12px 0;
      font-size: 0.9rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* ===== HERO SECTION ===== */
    .hero-section {
      background: linear-gradient(135deg, #001d3d 0%, #003566 100%);
      color: white;
      padding: 100px 0;
      margin-bottom: 80px;
      position: relative;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(255, 192, 4, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 192, 4, 0.08) 0%, transparent 50%);
      animation: pulse 8s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      background: rgba(255, 192, 4, 0.15);
      border: 1px solid rgba(255, 192, 4, 0.3);
      padding: 8px 20px;
      border-radius: 50px;
      font-size: 0.9rem;
      color: #ffc004;
      animation: fadeInDown 0.8s ease-out;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }

    .highlight-text {
      background: linear-gradient(135deg, #ffc004 0%, #ffb700 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.9);
      animation: fadeInUp 0.8s ease-out 0.4s both;
    }

    .btn-primary {
      background: linear-gradient(135deg, #ffc004 0%, #ffb700 100%);
      border: none;
      color: #001d3d;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(255, 192, 4, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 192, 4, 0.4);
      background: linear-gradient(135deg, #ffb700 0%, #ffc004 100%);
    }

    .btn-outline-light {
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-outline-light:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
      transform: translateY(-2px);
    }

    .hero-features {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
      margin-top: 30px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
    }

    .feature-item i {
      font-size: 1.3rem;
      color: #ffc004;
    }

    .hero-stats-container {
      animation: fadeInRight 0.8s ease-out 0.6s both;
    }

    .stat-card-modern {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 30px 20px;
      text-align: center;
      transition: all 0.3s ease;
      height: 100%;
    }

    .stat-card-modern:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .stat-icon {
      font-size: 2.5rem;
      color: #ffc004;
      margin-bottom: 15px;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      color: white;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* ===== PRODUCT CARDS ===== */
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

    .product-badge-container {
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 10;
    }

    .product-badge {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .badge-new {
      background: linear-gradient(135deg, #ffc004 0%, #ffb700 100%);
      color: #001d3d;
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

    .product-image-placeholder {
      font-size: 4rem;
      color: #dee2e6;
    }

    .product-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      gap: 10px;
    }

    .product-card-enhanced:hover .product-overlay {
      opacity: 1;
    }

    .product-overlay .btn {
      width: 40px;
      height: 40px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .product-info {
      padding: 20px;
    }

    .product-category {
      color: #6c757d;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
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

    .product-rating {
      color: #ffc004;
      font-size: 0.9rem;
    }

    .rating-count {
      color: #6c757d;
      font-size: 0.85rem;
      margin-left: 5px;
    }

    .product-price-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 800;
      color: #001d3d;
      margin-bottom: 5px;
      text-align: right;
    }

    .product-price-old {
      font-size: 1rem;
      color: #6c757d;
      text-decoration: line-through;
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

    .empty-state {
      padding: 60px 20px;
    }

    .empty-state i {
      font-size: 5rem;
      color: #dee2e6;
    }

    /* ===== TESTIMONIALS ===== */
    .testimonials-section {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 80px 0;
      margin-bottom: 60px;
    }

    .testimonial-card {
      background: white;
      border-radius: 20px;
      padding: 35px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .testimonial-rating {
      color: #ffc004;
      font-size: 1.1rem;
    }

    .testimonial-text {
      font-size: 1rem;
      line-height: 1.8;
      color: #495057;
      font-style: italic;
      margin-bottom: 25px;
      flex-grow: 1;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 15px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }

    .author-avatar {
      font-size: 3rem;
      color: #001d3d;
      line-height: 1;
    }

    .author-info {
      flex-grow: 1;
    }

    .author-name {
      font-weight: 700;
      color: #001d3d;
      font-size: 1rem;
      margin-bottom: 3px;
    }

    .author-location {
      color: #6c757d;
      font-size: 0.85rem;
    }

    .verified-badge {
      color: #ffc004;
      font-size: 1.5rem;
    }

    .trust-stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
      flex-wrap: wrap;
      background: white;
      padding: 30px 50px;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      max-width: 600px;
      margin: 0 auto;
    }

    .trust-stat-item {
      text-align: center;
    }

    .trust-stat-number {
      font-size: 2rem;
      font-weight: 800;
      color: #001d3d;
      margin-bottom: 5px;
    }

    .trust-stat-label {
      font-size: 0.9rem;
      color: #6c757d;
    }

    .trust-stat-divider {
      width: 1px;
      height: 50px;
      background: #dee2e6;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 991px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-section {
        padding: 60px 0;
      }
    }

    @media (max-width: 767px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .promo-banner {
        font-size: 0.8rem;
      }

      .trust-stats {
        gap: 20px;
        padding: 20px 30px;
      }

      .trust-stat-divider {
        display: none;
      }
    }
  `]
})
export class HomePage implements OnInit {
  paymentSuccess = signal(false);
  orderId = signal('');
  featuredProducts = signal<any[]>([]);
  loading = signal(false);

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['paymentSuccess'] === 'true') {
        this.paymentSuccess.set(true);
        this.orderId.set(params['orderId'] || '');
        setTimeout(() => this.dismissAlert(), 10000);
      }
    });

    this.loadFeaturedProducts();
  }

  loadFeaturedProducts() {
    this.loading.set(true);
    this.productsService.list().subscribe({
      next: (res) => {
        const list = Array.isArray(res) ? res :
          Array.isArray((res as any)?.items) ? (res as any).items :
            Array.isArray((res as any)?.products) ? (res as any).products : [];

        this.featuredProducts.set(list.slice(0, 8));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  dismissAlert() {
    this.paymentSuccess.set(false);
  }
}
