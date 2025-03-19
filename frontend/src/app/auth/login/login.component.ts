import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router, RouterModule } from "@angular/router";
import { setLocalStorage } from "src/app/shared/common/function";
import { TOAST, TOKEN } from "src/app/shared/constant/keys.constant";
import { ToastService } from "src/app/shared/components/toast/toast.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  //Form variable
  loginForm!: FormGroup;

  //toggle password field.
  showPassword: boolean = false;

  //Check form is submitted
  isSubmitted: boolean = false;
  loginFailed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  /**
   * Create Login Form control.
   */
  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  /**
   * onSubmit login form.
   * Check User Credentials and set Token.
   */
  checkCredentials() {
    const value = this.loginForm.value;
    if (this.loginForm.valid) {
      //Subscribe login() from service and fetch response.
      this.authService.login(value).subscribe({
        next: (response: any) => {
          if (response.statusCode == 200 || response.statusCode == 201) {
            //Set Token & navigate to `/home` route.
            const { accessToken } = response?.data;
            setLocalStorage(TOKEN, accessToken);
            this.toastService.showToast(
              TOAST.TOAST_STATE.success,
              "Login Successfully"
            );
            this.router.navigateByUrl("/home");
          }
        },
        error: (err: any) => {
          this.loginFailed = true;
          this.toastService.showToast(
            TOAST.TOAST_STATE.danger,
            err?.error?.message
          );
          this.cdr.markForCheck();
        },
      });
    }

    this.isSubmitted = true;
  }

  /**
   * Toggle the password field.
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
