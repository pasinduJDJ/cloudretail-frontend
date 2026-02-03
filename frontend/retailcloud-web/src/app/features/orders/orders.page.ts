import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  standalone: true,
  selector: 'app-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.page.html',
})
export class OrdersPage {
  loading = signal(false);
  error = signal<string | null>(null);
  orders = signal<any[]>([]);

  totalSpent = computed(() =>
    this.orders().reduce((sum, o) => sum + Number(o?.totalAmount ?? o?.total ?? 0), 0)
  );

  constructor(private ordersService: OrdersService) {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.ordersService.list().subscribe({
      next: (res) => {

        const list =
          Array.isArray(res) ? res :
            Array.isArray((res as any)?.items) ? (res as any).items :
              Array.isArray((res as any)?.orders) ? (res as any).orders :
                [];
        list.sort((a: any, b: any) => {
          const ta = new Date(a.createdAt || a.created_at || a.timestamp || 0).getTime();
          const tb = new Date(b.createdAt || b.created_at || b.timestamp || 0).getTime();
          return tb - ta;
        });

        this.orders.set(list);
        this.loading.set(false);
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.message || 'Failed to load orders.');
      }
    });
  }

  statusOf(o: any) {
    return o.status || o.orderStatus || 'PAID';
  }

  getOrderItems(o: any): any[] {
    return o.items || o.orderItems || [];
  }

  formatDate(v: any) {
    if (!v) return '—';
    const d = new Date(v);
    if (isNaN(d.getTime())) return String(v);
    return d.toLocaleString();
  }

  money(v: number) {
    return (Math.round((Number(v) + Number.EPSILON) * 100) / 100).toFixed(2);
  }
}
