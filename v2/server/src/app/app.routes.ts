import { VisualizarTestRealizadoComponent } from './pages/paciente/visualizar-test-realizado/visualizar-test-realizado.component';
import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
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
import { LogoutComponent } from './pages/auth/logout/logout.component';

import { ProfileComponent } from './components/profile/profile.component';
import { GestionarPacientesComponent } from './pages/admin/gestionar-pacientes/gestionar-pacientes.component';
import { GestionarEspecialistasComponent } from './pages/admin/gestionar-especialistas/gestionar-especialistas.component';
import { GestionarTestsComponent } from './pages/admin/gestionar-tests/gestionar-tests.component';
import { VisualizarTestsRealizadosComponent } from './pages/especialista/visualizar-tests-realizados/visualizar-tests-realizados.component';
import { UserTypeGuard } from './guards/user-type.guard';

import { AuthGuard } from './guards/auth.guard';
import { HeadMapComponent } from './components/head-map/head-map.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
      },

      {
        path: 'admin',
        canActivate: [UserTypeGuard],
        children: [
          {
            path: 'gestionar-especialistas',
            component: GestionarEspecialistasComponent,
          },
          {
            path: 'gestionar-tests',
            component: GestionarTestsComponent,
          },
        ],
      },
      {
        path: 'especialista',
        canActivate: [UserTypeGuard],
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full',
          },
          {
            path: 'visualizar-tests-realizados',
            component: VisualizarTestsRealizadosComponent,
          },
          {
            path: 'heat-map',
            component: HeadMapComponent,
          },
          {
            path: 'profile',
            component: ProfileComponent,
          },
        ],
      },
      {
        path: 'paciente',
        canActivate: [UserTypeGuard],
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full',
          },
          {
            path: 'realizar-test',
            component: TestsComponent,
          },
          {
            path: 'profile',
            component: ProfileComponent,
          },
          {
            path: 'visualizar-test-realizado',
            component: VisualizarTestRealizadoComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
