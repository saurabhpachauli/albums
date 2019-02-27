import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit {
  @Input() album;
  constructor() {
  }

  ngOnInit() {

  }

}
