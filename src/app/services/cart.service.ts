import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any[]>([]);
  public search = new BehaviorSubject<string>("");

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItemList = JSON.parse(storedCart);
      this.productList.next(this.cartItemList);
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any[]) {
    this.cartItemList.push(...product);
    this.productList.next(this.cartItemList);
    this.updateLocalStorage();
  }

  addtoCart(product: any,type:any='+') {
    const existingProduct = this.cartItemList.find((item: any) => item.id === product.id);

    if (existingProduct) {
      type=='+'?existingProduct.quantity += 1:existingProduct.quantity -= 1;
      existingProduct.total = existingProduct.price * existingProduct.quantity;
    } else {
      product.quantity = 1;
      product.total = product.price;
      this.cartItemList.push(product);
    }

    this.productList.next(this.cartItemList);
    this.updateLocalStorage();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return Number(grandTotal.toFixed(2));
  }

  removeCartItem(product: any) {
    let count = 0;
    this.cartItemList = this.cartItemList.filter((a: any) => {
      if (a.id === product.id && count < 1) {
        count++;
        return false;
      }
      return true;
    });
    this.productList.next(this.cartItemList);
    this.updateLocalStorage();
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.updateLocalStorage();
  }
}
