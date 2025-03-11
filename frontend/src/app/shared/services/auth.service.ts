import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  LOGIN_API,
  LOGOUT_API,
  REGISTER_USER_API,
} from "../constant/api.constant";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Make a post request to login api.
   * @param data user credentials
   * @returns response from login api.
   */
  login(data: any): Observable<any> {
    return this.http.post(LOGIN_API, data);
  }

  /**
   * Make a post request to register user api.
   * @param data user details
   * @returns response from register api.
   */
  register(data: any): Observable<any> {
    return this.http.post(REGISTER_USER_API, data);
  }

  /**
   * Make a request to logout api.
   * @returns response from logout api.
   */
  logout(): Observable<any> {
    return this.http.post(LOGOUT_API, {});
  }
}
