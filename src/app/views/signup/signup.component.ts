import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { registerType } from '../../../models/custom-type';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  signUpForm = new FormGroup({
    user: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
  });

  saveUser(): void {
    const data: registerType = {
      "email": this.signUpForm.controls.email.value!,
      "username": this.signUpForm.controls.user.value!,
      "password": this.signUpForm.controls.password.value!
    }

    if (data['password'] == this.signUpForm.controls.passwordRepeat.value!) {
      this.loading = true;

      this.authService.register(data)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe(
          (result) => {
            if (result == 'User created') {
              this.authService.setIsLogged(false);
              this.goToLogin();
            } else {
              this.toastr.error('Error ao cadastrar o usuário')
            }
          }
        );
    } else {
      this.toastr.error('As senhas estão incorretas')
    }

  }

  goToLogin(): void {
    this.toastr.success('Cadastrado com sucesso')
    this.router.navigate(['login'])
  }


}
