import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private BASE_URL = 'http://192.168.1.221:9000/log';

  constructor(private http: HttpClient) {}

  /**
   * Message will show in red color
   */
  error(message: any): Observable<any> {
    return this.http.post(this.BASE_URL, { message, type: 'error' });
  }

  /**
   * Message will show in yellow color
   */
  warning(message: any): Observable<any> {
    return this.http.post(this.BASE_URL, { message, type: 'warn' });
  }

  /**
   * Message will show in italic.
   */
  log(message: any): Observable<any> {
    return this.http.post(this.BASE_URL, { message, type: 'log' });
  }
}
