import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {FireBaseResponse} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  create(product) {
    return this.http
      .post(`${environment.fbDbUrl}products.json`, product)
      .pipe(map( (res: FireBaseResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        };
      }));
  }
}
