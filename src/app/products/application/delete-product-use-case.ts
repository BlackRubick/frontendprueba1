import { Injectable } from '@angular/core';
import { ProductGateway } from '../domain/models/gateway/product-gateway';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductUseCase {
  constructor(private productGateway: ProductGateway) {}

  execute(id: number): Observable<void> {
    return this.productGateway.delete(id);
  }
}
