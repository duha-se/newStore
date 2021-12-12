import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {ProductserService} from '../services.service' ; 
import {Product} from '../models/products';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html' ,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  url: SafeResourceUrl
     html: string
      myJSON : string
      items : Product[];
      // p = prod ;
      total = 0;
      myAllProducts:any;
      myProducts : any ;
      new : any[]
  // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(url);
  urlSafe: SafeResourceUrl;
  // Products : Product[];
  isShowVeg = false;
 isShowFru = false;
 isShowBread = false;
 isShowMilk = false;
 isShowCanned = false;
 isShowDrinks = false;
 isShowSnacks = false;
  constructor(private prodSer : ProductserService , public sanitizer: DomSanitizer , private aRoute : ActivatedRoute) { }

  ngOnInit(): void {
//get All product when page loaded
    this.prodSer.getAlls().subscribe(res=>{
      this.myAllProducts=res;
   })
  }



  addToCart(product: Product) {
    this.prodSer.addToCart(product);
      console.log(this.prodSer.getItems());      
    //console.log(this.cartService.getItems());
    // this.toastr.success("Your " + product.name +" Product has been added to the cart!");
  }
  Sum(){

    this.items = this.prodSer.getItems();
    this.total = this.prodSer.total;
   return this.total ;
  }
  clear(){
   
    this.items = [];
    this.prodSer.clearCart();
    this.prodSer.total=0;
    this.items = this.prodSer.getItems();
    this.total = 0;
    // this.toastr.error("All The cart has been Removed Successfully");
    // this.route.navigateByUrl('/Chart');
  }
  clearItem(item:Product){
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.total -= item.price;
      this.items.splice(index, 1);
  }   
  // this.toastr.error(item.name + "  Product has been Removed Successfully");
  
  }
}
