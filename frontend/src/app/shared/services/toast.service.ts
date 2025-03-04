import { Injectable } from "@angular/core";
import { IToastInfo } from "../interface/interface";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  toaster: IToastInfo[] = [];

  constructor() {}

  /**
   * Adds a success toast message to the toaster list.
   * @param message The message to display in the toast body.
   */
  success(message: string) {
    this.toaster.push({
      header: "Success",
      body: message,
    });
  }

  /**
   * Adds an error toast message to the toaster list.
   * @param message The message to display in the toast body.
   */
  error(message: string) {
    this.toaster.push({
      header: "Error",
      body: message,
    });
    console.log("toaster :>>", this.toaster);
  }

  /**
   * Adds a warning toast message to the toaster list.
   * @param message The message to display in the toast body.
   */
  warning(message: string) {
    this.toaster.push({
      header: "Warn",
      body: message,
    });
  }

  /**
   * Removes a toast from the list of toasts to show.
   * @param toast The toast to remove.
   */
  remove(toast: any) {
    this.toaster = this.toaster.filter((t) => t !== toast);
  }
}
