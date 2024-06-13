import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { IndexComponent } from './pages/test/index/index.component';
import { CognitivoComponent } from './pages/test/cognitivo/cognitivo.component';
import { FisiologicoComponent } from './pages/test/fisiologico/fisiologico.component';
import { MotorComponent } from './pages/test/motor/motor.component';
import { completeGuard } from './service/guards/complete.guard';
import { EndComponent } from './pages/test/end/end.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ':codigo_estudiante/test',
        component: IndexComponent,
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: ':codigo_estudiante/test/cognitivo',
    component: CognitivoComponent,
    canActivate: [completeGuard],
  },
  {
    path: ':codigo_estudiante/test/fisiologico',
    component: FisiologicoComponent,
    canActivate: [completeGuard],
  },
  {
    path: ':codigo_estudiante/test/motor',
    component: MotorComponent,
    canActivate: [completeGuard],
  },

  {
    path: ':codigo_estudiante/test/end',
    component: EndComponent,
  },
];
