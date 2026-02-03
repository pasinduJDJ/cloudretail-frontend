import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    standalone: true,
    selector: 'app-navbar',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
    cartCount = signal<number>(0);

    // Manual toggle for mobile menu
    isMenuCollapsed = signal<boolean>(true);

    constructor(private router: Router, private cart: CartService, public auth: AuthService) { }

    ngOnInit() {
        // Subscribe to cart count changes for real-time updates
        this.cart.cartCount$.subscribe(count => {
            this.cartCount.set(count);
        });
    }

    toggleMenu() {
        this.isMenuCollapsed.set(!this.isMenuCollapsed());
    }

    toggleSearch() {
        // Navigate to products page with search functionality
        this.router.navigate(['/products']);
    }
}
