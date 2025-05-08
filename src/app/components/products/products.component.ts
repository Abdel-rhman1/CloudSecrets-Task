import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public productList: any;
  public filterCategory : any;
  searchKey:string = "";
  constructor(private api: ApiService,private cartService : CartService) {

  }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res => {
      this.productList = res;
      console.log(this.productList);
    });
  }
  addToCart(item :any){
   this.cartService.addtoCart(item)
  }
  filter(category :string){
    this.filterCategory = this.productList.filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    });
  }
}

