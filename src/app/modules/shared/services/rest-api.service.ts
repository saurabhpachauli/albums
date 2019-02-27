import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept-Language': AppSettings.HEADER_ACCEPT_LANGUAGE,
    'Content-Type': AppSettings.HEADER_CONTENT_TYPE,
    'Accept': AppSettings.HEADER_CONTENT_TYPE
  })
};

@Injectable()
export class RestApiService {
  httpHandleError: HandleError;
  constructor(private httpClient: HttpClient, private httpErrorHandler: HttpErrorHandler,
    private zone: NgZone, private router: Router,
    private storageService: StorageService) {
    this.httpHandleError = httpErrorHandler.createHandleError();
  }

  private prependApiUrl(url: string): string {
    return AppSettings.BASE_URL + url;
  }

  get(identifier: string, url: string, loader?: string): Observable<{}> {
    return this.handleHttpSuccess(this.callerWithoutBody('get', identifier, url));
  }

  post(identifier: string, url: string, body: any, loader?: string): Observable<{}> {
    return this.handleHttpSuccess(this.callerWithBody('post', identifier, url, body));
  }

  put(identifier: string, url: string, body?: any, loader?: string): Observable<{}> {
    return this.handleHttpSuccess(this.callerWithBody('put', identifier, url, body));
  }

  delete(identifier: string, url: string, loader?: string): Observable<{}> {
    return this.handleHttpSuccess(this.callerWithoutBody('delete', identifier, url));
  }

  callerWithoutBody(method: string, identifier: string, url: string): Observable<{}> {
    const head = { headers: this.getHttpClientHeaders(), withCredentials: true };
    const that = this;
    if (method === 'get') {
      return this.httpClient.get(this.prependApiUrl(url), head).pipe(
        catchError(this.httpHandleError(identifier, []))
      ).pipe(
        map((r: Response) => {
          return r;
        })
      );
    } else if (method === 'delete') {
      return this.httpClient.delete(this.prependApiUrl(url), head).pipe(
        catchError(this.httpHandleError(identifier, []))
      ).pipe(
        map((r: Response) => {
          return r;
        })
      );
    }
  }
  callerWithBody(method: string, identifier: string, url: string, body?: any): Observable<{}> {
    const that = this;
    const head = { headers: this.getHttpClientHeaders(), withCredentials: true };
    if (method === 'put') {
      return this.httpClient.put(this.prependApiUrl(url), body, head).pipe(
        catchError(this.httpHandleError(identifier, []))
      ).pipe(
        map((r: Response) => {
          return r;
        })
      );
    } else if (method === 'post') {
      return this.httpClient.post(this.prependApiUrl(url), body, head).pipe(
        catchError(this.httpHandleError(identifier, []))
      ).pipe(
        map((r: Response) => {
          return r;
        })
      );
    }
  }

  image(identifier: string, url: string, fileName: string, loader?: string) {
    // responseType: ResponseContentType.Blob
    const head = { headers: this.getHttpClientHeaders() };
    const res = this.httpClient.get(url, head).pipe(
      catchError(this.httpHandleError(identifier, []))
    );
    this.downloadFile(res, this.getContentType(fileName), fileName);
  }

  private getHttpClientHeaders(): HttpHeaders {
    if (this.storageService.getItemFromCookies(AppSettings.TOKEN_KEY) !== undefined
      && this.storageService.getItemFromCookies(AppSettings.TOKEN_KEY) !== null
      && this.storageService.getItemFromCookies(AppSettings.TOKEN_KEY).length > 0) {
      return new HttpHeaders({
        'Accept-Language': AppSettings.HEADER_ACCEPT_LANGUAGE,
        'Content-Type': AppSettings.HEADER_CONTENT_TYPE,
        'Accept': AppSettings.HEADER_CONTENT_TYPE,
        // 'X-SESSION-KEY': this.storageService.getItemFromCookies(AppSettings.TOKEN_KEY)
      });
    }
    return new HttpHeaders({
      'Accept-Language': AppSettings.HEADER_ACCEPT_LANGUAGE,
      'Content-Type': AppSettings.HEADER_CONTENT_TYPE,
      'Accept': AppSettings.HEADER_CONTENT_TYPE
    });
  }

  private handleHttpSuccess(res: Observable<{}>): Observable<{}> {
    return res;
  }

  downloadFile(data: any, contentType: string, fileName: string) {
    const blob = new Blob([data.blob()], { type: contentType });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  private getContentType(fileName: string) {
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    switch (extension) {
      case 'jpeg':
        return 'image/jpeg';
      case 'jpg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'bmp':
        return 'image/x-ms-bmp';
      case 'pdf':
        return 'application/pdf';
      case 'xls':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }
    return '';
  }
}
