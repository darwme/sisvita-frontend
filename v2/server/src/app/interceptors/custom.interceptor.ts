import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = localStorage.getItem('token');
  const decodedToken = jwtDecode(myToken?.toString() || '');

  console.log('deacoded token: ', decodedToken);
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return next(cloneReq);
};
