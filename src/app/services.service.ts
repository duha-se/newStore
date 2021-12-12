import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import {Observable} from 'rxjs' ;
import { map } from 'rxjs/operators';
import {Product} from './models/products';
const prod = "http://localhost:8080/node/prod"
@Injectable({
  providedIn: 'root'
})
export class ProductserService {
  items : Product[]=[];
  total = 0;
  constructor(private httpClient: HttpClient){}
  
  getAlls(): Observable<any> {
    console.log("hi")
    return this.httpClient.get(prod);

  }

  getSingleCatag(id:number): Observable<any> {
    var res ;
    res= this.httpClient.get(prod);
    

    return res ;
      
  }
  
  // updateSingleProduct(id:string , updProduct :Product): Observable<Product>{
  //     return this.httpClient.put<Product>(prod + "/" + id , updProduct);
  
  //   }
  //   deleteSingleProduct(id:string): Observable<Product>{
  //     return this.httpClient.delete<Product>(prod + "/" + id);
  
  //   }
    // addSingleProduct(newProduct : Product): Observable<Product>{
    //   return this.httpClient.post<Product>(baseUrlPHP , newProduct);
    // }
    addToCart(product:Product) {
      this.items.push(product);
     this.UpdateTotalPrice(product);
     console.log(this.total);
    }
  
    getItems() {
      return this.items;
    }
    UpdateTotalPrice(product:Product){
      this.total += product.price * product.quantity;
      return this.total;
    }
    getPrice(){
      console.log(this.total);
      return this.total;
    }
  
    clearCart() {
      this.items = [];
      return this.items;
    }
    
  }
  