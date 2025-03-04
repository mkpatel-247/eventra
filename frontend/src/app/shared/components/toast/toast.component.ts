import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastService } from "../../services/toast.service";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
