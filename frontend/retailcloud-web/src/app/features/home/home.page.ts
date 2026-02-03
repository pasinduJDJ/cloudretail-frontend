import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [RouterLink],
    template: `
    <div class="container py-5">
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold">RetailCloud Store</h1>
          <p class="lead text-muted">
            A professional serverless e-commerce demo built with Angular + AWS API Gateway + Lambda microservices.
          </p>

          <div class="d-flex gap-2">
            <a class="btn btn-dark btn-lg" routerLink="/products">Browse Products</a>
            <a class="btn btn-outline-dark btn-lg" routerLink="/orders">My Orders</a>
          </div>

          <div class="mt-4 d-flex flex-wrap gap-2">
            <span class="badge text-bg-light border">Fast API</span>
            <span class="badge text-bg-light border">Secure Auth (Cognito)</span>
            <span class="badge text-bg-light border">Cart & Checkout</span>
            <span class="badge text-bg-light border">Order History</span>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="p-4 bg-light rounded-4 border">
            <div class="fw-bold mb-2">Demo User</div>
            <div class="text-muted small mb-3">Until Cognito is enabled, the app uses: <code>userId=U1001</code></div>

            <div class="row g-3">
              <div class="col-6">
                <div class="p-3 rounded-4 border bg-white">
                  <div class="text-muted small">Backend</div>
                  <div class="fw-semibold">Completed ✅</div>
                </div>
              </div>
              <div class="col-6">
                <div class="p-3 rounded-4 border bg-white">
                  <div class="text-muted small">Frontend</div>
                  <div class="fw-semibold">In Progress</div>
                </div>
              </div>
              <div class="col-12">
                <div class="p-3 rounded-4 border bg-white">
                  <div class="text-muted small">API Base</div>
                  <code class="small">https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev</code>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomePage { }
