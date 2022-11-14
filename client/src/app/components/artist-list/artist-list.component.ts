import { Component, HostBinding, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artista';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  artists: any = [];

  constructor(private artistService: ArtistsService) { }

  ngOnInit(): void {
    this.getArtists();
  }
  getArtists(){
    this.artistService.getArtists().subscribe(
      res => {
        this.artists = res;
      }, 
      err => console.error(err)
    );
  }
  deleteArtist(id: string){
    this.artistService.deleteArtist(id).subscribe(
      res => {
        console.log(res);
        this.getArtists();
      },
      err => console.error(err)
    )
  }

}
