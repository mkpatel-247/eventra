import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { getLocalStorage, setLocalStorage } from "../common/function";
import { REFRESH_TOKEN, TOKEN } from "../constant/keys.constant";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class MiddlewareInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private refreshTokenRequest: Observable<any> | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get token from localStorage
    const authHeader = getLocalStorage(TOKEN);

    if (authHeader) {
      request = this.addToken(request, authHeader);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.handle401Error(request, next);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }

  /**
   * Adds the authorization token to the request headers.
   * @param request - The HTTP request to which the token should be added.
   * @param token - The token to add to the authorization header.
   * @returns A cloned request with the added authorization header.
   */
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set("authorization", `Bearer ${token}`),
    });
  }

  /**
   * Handle 401 errors by refreshing the access token and retrying the request.
   * If the refresh token request fails, logout the user and redirect to login.
   * @param request - The original request that resulted in the 401 error.
   * @param next - The next handler in the interceptor chain.
   * @returns An observable of the response to the retried request.
   */
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.refreshTokenRequest = this.authService.updateRefreshToken().pipe(
      switchMap((newTokens: { accessToken: string; refreshToken: string }) => {
        this.refreshTokenRequest = null;

        // Store new tokens
        setLocalStorage(TOKEN, newTokens.accessToken);
        setLocalStorage(REFRESH_TOKEN, newTokens.refreshToken);

        return next.handle(this.addToken(request, newTokens.accessToken));
      }),
      catchError((err) => {
        // this.isRefreshing = false;
        this.refreshTokenRequest = null;
        localStorage.removeItem(TOKEN);
        this.router.navigateByUrl("/");
        this.authService.logout(); // Redirect to login if refresh fails
        return throwError(
          () => new Error("Session expired. Please log in again.")
        );
      })
    );
    return this.refreshTokenRequest
      ? this.refreshTokenRequest
      : throwError(() => new Error("Session expired. Please log in again."));
  }
}
