import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { getLocalStorage } from "../shared/common/function";
import { TOKEN } from "../shared/constant/keys.constant";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  constructor(private router: Router) {}

  //Check if token is there redirect to home route.
  ngOnInit(): void {
    if (getLocalStorage(TOKEN)) this.router.navigateByUrl("/home");
  }
}
