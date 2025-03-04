import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { getLocalStorage, setLocalStorage } from "./shared/common/function";
import { EVENT } from "./shared/constant/keys.constant";
import { ToastComponent } from "./shared/components/toast/toast.component";

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

  ngOnInit(): void {
    if (!getLocalStorage(EVENT)) setLocalStorage(EVENT, []);
  }
}
