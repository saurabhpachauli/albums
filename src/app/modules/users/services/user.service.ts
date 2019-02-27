import { Injectable } from '@angular/core';
import { RestApiService } from './../../shared/services/rest-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private restApi: RestApiService) { }

  getUserList(): Observable<any> {
    return this.restApi.get('user-list', `users`);
  }
  getAlbumList(id): Observable<any> {
    return this.restApi.get('album-list', `albums?userId=${id}`);
  }
  getAlbumImages(id): Observable<any> {
    return this.restApi.get('album-list', `photos?albumId=${id}`);
  }
}
