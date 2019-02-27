import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-albums',
  templateUrl: './list-albums.component.html',
  styleUrls: ['./list-albums.component.scss']
})
export class ListAlbumsComponent implements OnInit {
  userId;
  albums;
  images;
  viewImages = false;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.userId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.userService.getAlbumList(this.userId).subscribe(result => {
      this.albums = result;
    });
  }

  viewPhotos(album) {
    this.userService.getAlbumImages(album.id).subscribe(result => {
      if (result.length > 5) {
        this.images = result.slice(0, 5);
      } else {
        this.images = result;
      }
    });
    this.viewImages = true;
  }

  closeLightbox(event) {
    this.viewImages = event;
  }

  goBack() {
    this.router.navigate(['/users'])
  }
}
