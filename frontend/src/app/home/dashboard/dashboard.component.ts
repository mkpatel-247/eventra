import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "../../auth/auth.component";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { CommonService } from "src/app/shared/services/common.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(private common: CommonService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.common.breadCrumb$.next(this.route.data);
  }
}
