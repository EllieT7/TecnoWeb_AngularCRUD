import { Component, HostBinding, OnInit } from '@angular/core';
import { Product } from 'src/app/models/producto';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from 'src/app/services/artists.service';
import { ProductTypeService } from 'src/app/services/product-type.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  photoSelected!: String | ArrayBuffer;
  file: File = new File(["foo"], "foo", {
    type: "text/plain",
  });;
  @HostBinding('class') classes = 'row';
  
  artists: any = [];
  types: any = [];
  product: Product = {    
      id_producto: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      img: '',
      artista_id_artista: 1,
      tipo_producto_id_tp: 1,
    };

  constructor(private productsService: ProductsService, private route: Router, private activatedRoute: ActivatedRoute, private artistService: ArtistsService, private productTypeService: ProductTypeService) { }
  edit: boolean = false;
  ngOnInit(): void {
    this.getArtists();
    this.getTipoProducto();
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if(params['id']){
      this.productsService.getProduct(params['id']).subscribe(
        res => {
          console.log(res);
          this.product = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  // saveNewProduct(){
  //   delete this.product.id_producto;
  //   this.productsService.saveProduct(this.product).subscribe(  
  //     res => {
  //       console.log(res);
  //       this.route.navigate(['/products']);
  //     },
  //     err => console.error(err)
  //   )
  // } 
  updateProduct(){
    this.productsService
    .updateProduct(this.product.id_producto!, this.product, this.file)
    .subscribe(
      res => {
        console.log(res);
        this.route.navigate(['/products']);
      },
      err => console.error(err)
    )
  }
  
  getArtists(){
    this.artistService.getArtists().subscribe(
      res => {
        this.artists = res;
        console.log(res);
      }, 
      err => console.error(err)
    );
  }

  getTipoProducto(){
    this.productTypeService.getProductTypes().subscribe( 
      res => {
        this.types = res;
        console.log(res);
      }
    );
  }
  onPhotoSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.file = <File>target.files[0]!;
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result as String;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto() {
    delete this.product.id_producto;
    this.productsService
      .saveProduct(this.product, this.file)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/products'])
        },
        err => console.log(err)
      );
    return false;
  }
}
