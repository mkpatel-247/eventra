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
import { HttpService } from "src/app/shared/services/http.service";
import { Router } from "@angular/router";
import { setLocalStorage } from "src/app/shared/common/function";
import { TOKEN } from "src/app/shared/constant/keys.constant";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    private http: HttpService,
    private router: Router,
    private cdr: ChangeDetectorRef
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
      this.http.login(value).subscribe({
        next: (response: any) => {
          //Set Token & navigate to `/home` route.
          setLocalStorage(TOKEN, response.data);
          this.router.navigateByUrl("/home");
        },
        error: (err: any) => {
          this.loginFailed = true;
          this.cdr.detectChanges();
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
