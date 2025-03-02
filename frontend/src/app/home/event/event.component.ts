import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListViewComponent } from "./list-view/list-view.component";
import { CalendarViewComponent } from "./calendar-view/calendar-view.component";
import { CommonService } from "src/app/shared/services/common.service";
import { ActivatedRoute } from "@angular/router";
import {
  getLocalStorage,
  setLocalStorage,
} from "src/app/shared/common/function";

@Component({
  selector: "app-event",
  standalone: true,
  imports: [CommonModule, ListViewComponent, CalendarViewComponent],
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent implements OnInit {
  viewMode: boolean = false;

  constructor(private common: CommonService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.viewMode = getLocalStorage("view") || false;
    this.common.breadCrumb$.next(this.route.data);
  }
  /**
   * Toggle view list/calendar.
   */
  toggleViewButton() {
    this.viewMode = !this.viewMode;
    setLocalStorage("view", this.viewMode);
  }
}
