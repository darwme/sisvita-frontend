import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TestsComponent } from './components/tests/tests.component';
import { ErrorComponent } from './components/error/error.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PacienteComponent } from './pages/dashboard/paciente/paciente.component';
import { EspecialistaComponent } from './pages/dashboard/especialista/especialista.component';
import { AdminComponent } from './pages/dashboard/admin/admin.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
    ],
  },
  {
    path: 'paciente/dashboard',
    component: PacienteComponent,
  },
  {
    path: 'especialista/dashboard',
    component: EspecialistaComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminComponent,
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'tests',
    component: TestsComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
