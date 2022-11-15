import { HostBinding, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-album-carousel',
  templateUrl: './album-carousel.component.html',
  styleUrls: ['./album-carousel.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class AlbumCarouselComponent implements OnInit {
  // @HostBinding('class') classes = 'product-slider owl-carousel';
  albums : any = [];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getAlbums();
    for(let i = 0; i < this.albums.length; i++){
      if(this.albums[i].tipo_producto_id_tp!=1){
        this.albums.splice(i,1);
      }
    }
    this.loadScript('owl-carousel', 'assets/js/owl.carousel.min.js')
    .then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  getAlbums(){  
    this.productService.getProducts()
    .subscribe(
      res => {
        this.albums = res;
      },
      err => console.error(err)
    )
  }
  public loadScript(id: string, url: string) {
      return new Promise((resolve, reject) => {
      if(id && document.getElementById(id)) {
          resolve({id: id, loaded: true, status: 'Already Loaded'});
      }
      let body =  document.body;
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = '';
      script.src = url;
      script.id = id;
      script.onload =() => {
          resolve({id: id, loaded: true, status: 'Loaded'});
      };
      script.onerror = (error: any) => resolve({id: id, loaded: false, status: 'Loaded'});
      script.async = true;
      script.defer = true;
      body.appendChild(script);
  });
  }

  public removeScript(id: string) {
      let script = document.getElementById(id);
      if(script) {
          script.remove();
      } 
  }
}
