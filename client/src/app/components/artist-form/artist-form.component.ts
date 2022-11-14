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
  photoSelected!: String | ArrayBuffer;
  file!: File;

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
    this.artistsService
    .saveArtist(this.artist, this.file)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/artists']);
      },
      err => console.error(err)
    );
    return false;
  }

  updateArtist(){
    this.artistsService
    .updateArtist(this.artist.id_artista!, this.artist, this.file)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/artists']);
      },
      err => console.error(err)
    )
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
}
