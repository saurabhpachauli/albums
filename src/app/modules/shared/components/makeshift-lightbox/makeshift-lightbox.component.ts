import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-makeshift-lightbox',
  templateUrl: './makeshift-lightbox.component.html',
  styleUrls: ['./makeshift-lightbox.component.scss']
})
export class MakeshiftLightboxComponent implements OnInit {
  @Input() documents;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  file;
  imageIndex = 0;
  poNumber = '';
  verified = 0;
  msgs = [];
  downloadInvoiceName = '';
  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.documents.length) {
      this.file = this.documents[0].url;
    }
  }

  closeLightbox() {
    this.documents = [];
    this.file = '';
    this.closeEvent.emit(false);
  }

  toggleImage(mode) {
    if (mode === 'prev' && this.imageIndex > 0) {
      this.imageIndex--;
      this.showCurrentIndexFile();
    } else if (mode === 'next' && this.imageIndex < this.documents.length - 1) {
      this.imageIndex++;
      this.showCurrentIndexFile();
    } else {
      return;
    }
  }

  showCurrentIndexFile() {
    const showFile = this.documents[this.imageIndex].url;
    this.file = showFile;
  }

  changeOpacityOfNext() {
    if (this.imageIndex === this.documents.length - 1) {
      return {
        opacity: .1,
        cursor: 'default'
      };
    } else {
      return {
        opacity: 1,
        cursor: 'pointer'
      };
    }
  }

  changeOpacityOfPrev() {
    if (this.imageIndex === 0) {
      return {
        opacity: .1,
        cursor: 'default'
      };
    } else {
      return {
        opacity: 1,
        cursor: 'pointer'
      };
    }
  }
}
