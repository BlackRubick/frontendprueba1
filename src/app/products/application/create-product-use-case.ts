import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductGateway } from '../domain/models/gateway/product-gateway';
import { Product } from '../domain/models/product';

@Injectable({
    providedIn: 'root'
  })
export class CreateProductUseCase{
    constructor(private productGateway: ProductGateway){}

    execute(name:string,price:number): Observable<Product> {
        return this.productGateway.create(name,price); 
      }
}