import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client.service';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    constructor(private api: ApiClient) { }

    list() {
        return this.api.get<any>('/products');
    }

    getById(productId: string) {
        return this.api.get<any>(`/products/${productId}`);
    }
}
