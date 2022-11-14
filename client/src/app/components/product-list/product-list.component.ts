import { Component, HostBinding, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  products: any = [];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productService.getProducts().subscribe(
      res => {
        this.products = res;
      }, 
      err => console.error(err)
    );
  }
  deleteProduct(id: string){
    this.productService.deleteProduct(id).subscribe(
      res => {
        console.log(res);
        this.getProducts();
      },
      err => console.error(err)
    )
  }


}
