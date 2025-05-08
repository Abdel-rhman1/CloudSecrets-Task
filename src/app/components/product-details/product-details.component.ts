import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  public productId:number=0;
  public product:any;

  constructor(private api: ApiService,private activeRouter:ActivatedRoute,private cartService:CartService){

  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((res)=>{
      console.log(res);

      this.productId = res['id'];
      this.getProductDetails();
    })
  }


  getProductDetails(){
    this.api.getProductDetails(this.productId).subscribe(res=>{
      console.log(res);
      this.product = res;
    })
  }


  addToCart(){
    this.cartService.addtoCart(this.product)
   }
}
