import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8081/api/products")
  }

  findAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:8081/api/products/category")
  }

  findOne(id?: number): Observable<Product> {
    return this.httpClient.get<Product>("http://localhost:8081/api/products/" + id)
  }

  create(product: Product): Observable<void> {
    return this.httpClient.post<void>("http://localhost:8081/api/products", product);
  }

  update(id: number, product: Product): Observable<void> {
    return this.httpClient.put<void>("http://localhost:8081/api/products/" + id, product);
  }
}
