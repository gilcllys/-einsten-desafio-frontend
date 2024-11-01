import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { loginType, registerType } from '../models/custom-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private isLoggedIn = false;


  // Requisição para cadastro (sem autenticação)
  register(userData: registerType): Observable<any> {
    return this.post('register/', userData, false);
  }

  // Requisição para login (sem autenticação)
  login(credentials: loginType): Observable<any> {
    return this.post('login/', credentials, false);
  }

  setIsLogged(value: boolean) {
    this.isLoggedIn = value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
