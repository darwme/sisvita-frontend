import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

export const userTypeGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return new Router().parseUrl('/auth/login');
  }
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  console.log('Token decoded: ', decodedToken);
  const userType = decodedToken?.usertype;
  if (userType === 'admin') {
    return true;
  } else if (userType === 'especialista') {
    return true;
  } else if (userType === 'paciente') {
    return true;
  }

  return false;
};
