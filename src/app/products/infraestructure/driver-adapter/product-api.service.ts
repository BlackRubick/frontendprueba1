import { Injectable } from '@angular/core';
import { ProductGateway } from '../../domain/models/gateway/product-gateway';
import { Product } from '../../domain/models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends ProductGateway {

  private apiUrl = 'http://52.2.104.48:8080/tickets/';

  constructor(private http: HttpClient) {super();}

  create(name: string, price: number): Observable<Product> {
    // Adaptando los nombres de los campos para que coincidan con el backend
    const payload = {
      client: name,  // Tu backend espera 'client', no 'name'
      total: price.toString()  // Tu backend espera 'total' como string, no 'price' como number
    };

    return this.http.post<Product>(this.apiUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getAll(): Observable<Product[]> {
    // La respuesta probablemente ya es un array, sin estar dentro de un objeto 'products'
    return this.http.get<Product[]>(this.apiUrl);
  }

  update(product: Product): Observable<Product> {
    // Adaptando el formato para coincidir con el backend
    const payload = {
      client: product.Name || "", // Asumiendo que Product tiene un campo 'name'
      total: product.Price?.toString() || "" // Asumiendo que Product tiene un campo 'price'
    };

    return this.http.put<Product>(`${this.apiUrl}/${product.Id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}