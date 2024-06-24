import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
  CanActivate,
  RouterStateSnapshot,
  GuardResult,
  MaybeAsync,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponse } from './../models/loginResponse';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserTypeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const personaType = localStorage.getItem('personaType');
    const userType = localStorage.getItem('userType');
    console.log('Data from usertype: ', personaType);
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['auth/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    if (userType !== 'admin') {
      switch (personaType) {
        case 'paciente' || 'mixto':
          if (state.url.includes('paciente')) {
            return true;
          } else {
            this.router.navigate(['auth/login'], {
              queryParams: { returnUrl: state.url },
            });
            return false;
          }
        case 'especialista' || 'mixto':
          if (state.url.includes('especialista')) {
            return true;
          } else {
            this.router.navigate(['auth/login'], {
              queryParams: { returnUrl: state.url },
            });
            return false;
          }
        default:
          this.router.navigate(['auth/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
      }
    } else if (userType === 'admin') {
      return true;
    } else {
      this.router.navigate(['auth/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
