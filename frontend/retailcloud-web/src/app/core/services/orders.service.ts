import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    constructor(private api: ApiClient) { }

    checkout(userId = environment.demoUserId) {
        return this.api.post<any>('/orders/checkout', {}, { userId });
    }

    list(userId = environment.demoUserId) {
        return this.api.get<any>('/orders', { userId });
    }
}
