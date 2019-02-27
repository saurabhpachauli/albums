import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MessageService } from 'primeng/components/common/messageservice';


export type HandleError = <T> (identifier?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;
@Injectable()
export class HttpErrorHandler {
  constructor(private router: Router, private messageService: MessageService) { }
  createHandleError = () => <T>
    (identifier = 'unknown', result = {} as T) => this.handleError(identifier, result)

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param identifier - name of the identifier that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(identifier = 'unknown', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      this.messageService.clear();
      if (error.status === 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Server Unreachable.',
          detail: 'Sorry, seems like server is unreachable.'
        });
        return Observable.throw(result);
      }

      if (error.status === 500) {
        return Observable.throw(result);
      }

      if (error.status === 401) {
        this.messageService.add({
          severity: 'error',
          summary: 'Sign in required!',
          detail: 'Please login again to access the application.'
        });
        this.router.navigate(['/signin']);
        return Observable.throw(result);
      }

      if (error.error.errors !== undefined && error.error.errors !== null) {
        if (error.status === 400) {
          return Observable.throw(result);
        }

      }

      return Observable.throw(result);
    };
  }

  manageGeneralMsg(code: number) {
    let errorHeader = 'Login Error';
    if (code === 500) {
      errorHeader = 'Server Error';
    }
    this.messageService.add({
      severity: 'error',
      summary: errorHeader,
      detail: 'Error'
    });
  }
}
