import { Injectable } from '@angular/core';
import { Product } from '../domain/models/product';
import { ProductGateway } from '../domain/models/gateway/product-gateway';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllProductsUseCase {
  constructor(private productGateway: ProductGateway) {}

  execute(): Observable<Product[]> {
    return this.productGateway.getAll();
  }
}
