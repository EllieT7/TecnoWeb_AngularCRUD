import { Component, OnInit } from '@angular/core';
import { ArtistsService } from 'src/app/services/artists.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  artistas: any = [];
  types: any = [];

  constructor(private artistService: ArtistsService, private typeService: ProductTypeService) { }

  ngOnInit(): void {
    this.getArtists();
    this.getTypes();
  }
  getArtists(){
    this.artistService.getArtists().subscribe(
      res => {
        this.artistas = res;
      }, 
      err => console.error(err)
    );
  }

  getTypes() {
    this.typeService.getProductTypes().
    subscribe(
      res => {
        this.types = res;
        console.log(this.types);
      } ,
      err => console.error(err)
    );
  }

}
