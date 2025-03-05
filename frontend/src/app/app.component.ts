import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { getLocalStorage, setLocalStorage } from "./shared/common/function";
import { EVENT, TOAST } from "./shared/constant/keys.constant";
import { ToastComponent } from "./shared/components/toast/toast.component";
import { ToastService } from "./shared/components/toast/toast.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = "calendar-events";
  toastMessage: any = [];

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.toast.showToast(
      TOAST.TOAST_STATE.success,
      "Welcome to Calendar Events"
    );
    //Initialize event list in local storage.
    if (!getLocalStorage(EVENT)) setLocalStorage(EVENT, []);
  }
}
