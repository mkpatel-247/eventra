import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastService } from "./toast.service";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  toastMessage: any = [];
  constructor(
    public toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.toastService.showToast$.subscribe((res) => {
      this.toastMessage = res;
      this.cdr.markForCheck();
    });
  }
}
