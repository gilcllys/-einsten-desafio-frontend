import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';
import { loginType } from '../../../models/custom-type';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.checkAccessToken()
  }


  checkAccessToken(): void {
    const token: string = localStorage.getItem('access')!
    if (token) {
      this.authService.setIsLogged(true);
      this.goToHome()
    } else {
      this.authService.setIsLogged(false);
    }
  }
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onLogin(): void {
    this.loading = true;
    const username = this.loginForm.controls.user.value!;
    const password = this.loginForm.controls.password.value!;

    const data: loginType = {
      "username": username,
      "password": password
    }
    this.authService.login(data)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (result) => {
          if (result.access && result) {
            this.authService.setIsLogged(true);
            localStorage.setItem('access', result.access);
            this.goToHome();
          }
        }
      );

  }

  goToHome(): void {
    this.toastr.success('Login com sucesso')
    this.router.navigate(['home'])
  }

  goToSignUp(): void {
    this.router.navigate(['signup'])
  }


}
