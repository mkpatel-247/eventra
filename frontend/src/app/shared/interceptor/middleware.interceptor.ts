import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLocalStorage } from '../common/function';
import { TOKEN } from '../constant/keys.constant';

@Injectable()
export class MiddlewareInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Get token from localStorage.
    const authHeader = getLocalStorage(TOKEN);

    if (authHeader) {
      /**
       * Set token in header.
       */
      const cloneRequest = request.clone({
        headers: request.headers.set('authorization', `${authHeader}`),
      });
      return next.handle(cloneRequest);
    } else {
      return next.handle(request);
    }
  }
}
