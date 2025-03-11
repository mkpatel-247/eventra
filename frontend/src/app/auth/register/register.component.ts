import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { TOAST } from "src/app/shared/constant/keys.constant";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  /**
   * RegisterComponent constructor
   * @param authService authentication service
   * @param router router for navigation
   * @param formBuilder form builder for creating form
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.initializeRegisterForm();
  }

  /**
   * Initializes the register form
   * @returns FormGroup a form group with validators for the register form
   */
  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }
  /**
   * Getter for register form controls
   * @returns {AbstractControl} register form controls
   */
  get fc() {
    return this.registerForm.controls;
  }

  /**
   * Submits the register form if it is valid.
   * Registers the user via the AuthService and navigates to the login page upon success.
   * Logs an error if registration fails.
   * Marks all form controls as touched to trigger validation messages.
   */
  onSubmitRegisterForm() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.toastService.showToast(
            TOAST.TOAST_STATE.success,
            "Register Successfully"
          );
          this.router.navigate(["/auth/login"]);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
