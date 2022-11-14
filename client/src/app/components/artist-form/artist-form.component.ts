import { Component, HostBinding, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artista';
import  { ArtistsService } from 'src/app/services/artists.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})
export class ArtistFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  
  edit: boolean = false;
  artist: Artist = {
    id_artista: 0,
    nombre: '',
    descripcion: '',
    img: ''
  };
  constructor(private artistsService: ArtistsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.artistsService.getArtist(params['id']).subscribe(
        res => {
          console.log(res);
          this.artist = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }

  }
  saveNewArtist(){
    delete this.artist.id_artista;
    this.artistsService.saveArtist(this.artist).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/artists']);
      },
      err => console.error(err)
    )
  }

  updateArtist(){
    this.artistsService.updateArtist(this.artist.id_artista!, this.artist).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/artists']);
      },
      err => console.error(err)
    )
  }
}
