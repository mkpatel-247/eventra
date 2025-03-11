import { Injectable } from "@angular/core";
import { IToastInfo } from "../../interface/interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  public toasts: IToastInfo[] = [];

  public showToast$ = new BehaviorSubject<any>([
    { message: "string", class: "string", show: true, icon: "", delay: 2000 },
  ]);
  constructor() {}

  /**
   * Add a toast to the list of toasts to be displayed.
   *
   * @param toastIcon The icon to be displayed in the toast.
   * @param toastState The class determine the type of toast displayed. (success, danger, warning)
   * @param toastMsg The message to be displayed in the toast.
   */
  showToast(toastState: string, toastMsg: string, toastIcon?: string) {
    this.toasts.push({
      message: toastMsg,
      class: toastState,
      show: true,
      icon: toastIcon,
    });
    this.showToast$.next(this.toasts);
  }

  /**
   * Close the currently displayed toast by setting its visibility to false.
   */
  closeToast(index: number) {
    this.toasts.splice(index, 1);
    this.showToast$.next(this.toasts);
    this.showToast$.value.show = false;
  }
}
