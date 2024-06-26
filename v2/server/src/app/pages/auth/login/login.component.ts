import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { Input, Component, Output, EventEmitter, inject } from '@angular/core';
import { LogoComponent } from '../../../components/logo/logo.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../../services/auth-service.service';
import Swal from 'sweetalert2';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../models/loginResponse';
import { DeacoderService } from '../../../services/deacoder.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    CommonModule,
    MatButton,
    MatCardModule,
    MatIcon,
    MatInputModule,
    LogoComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  data!: LoginResponse;
  loginForm: FormGroup;
  private readonly _formBuilder: FormBuilder;
  usuario!: Usuario;
  isEdited: boolean = false;
  errorMessage: any;
  secretKey: string = 'secretKey';

  constructor(
    private http: HttpClient,
    private route: Router,
    private authService: AuthServiceService,
    private dataService: DataService,
    private deacoderService: DeacoderService,
    formBuilder: FormBuilder
  ) {
    this._formBuilder = formBuilder;
    this.loginForm = this._formBuilder.group({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      clave: ['', Validators.required],
    });
  }

  getData(data: LoginResponse) {
    this.dataService.setData(data);
    console.log(data);
  }

  redirectToDashboard(tipo_persona: string) {
    if (tipo_persona === 'admin') {
      this.route.navigate(['/dashboard/admin']);
    } else if (tipo_persona === 'especialista') {
      this.route.navigate(['/dashboard/especialista']);
    } else if (tipo_persona === 'paciente') {
      this.route.navigate(['/dashboard/paciente']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tipo de usuario no válido',
      });
    }
  }

  loginUsuario(): void {
    this.usuario = this.loginForm.value as Usuario;
    console.log(this.usuario);
    this.authService.login(this.usuario).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          Swal.close();
          this.getData(res.data);
          localStorage.setItem('token', res.data.token);
          this.data = { ...res.data };
          localStorage.setItem('data', this.deacoderService.encrypt(this.data));

          const especialista = res.data.especialista;
          const paciente = res.data.paciente;
          const mixto = res.data.mixto;
          const admin = res.data.admin;

          let tipo_usuario = '';
          let tipo_persona = '';

          console.log('especialista', especialista);
          console.log('paciente', paciente);
          console.log('mixto', mixto);

          if (especialista) {
            tipo_usuario = especialista.persona.usuario.tipo_usuario;
            tipo_persona = especialista.persona.tipo_persona;
          }

          if (paciente) {
            tipo_usuario = paciente.persona.usuario.tipo_usuario;
            tipo_persona = paciente.persona.tipo_persona;
          }

          if (mixto) {
            tipo_usuario = mixto.persona.usuario.tipo_usuario;
            tipo_persona = mixto.persona.tipo_persona;
          }

          if (admin) {
            tipo_usuario = admin.persona.usuario.tipo_usuario;
          }

          console.log('tipousuario-persona', tipo_usuario, tipo_persona);

          localStorage.setItem('userType', tipo_usuario);
          localStorage.setItem('personaType', tipo_persona);

          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Inicio de sesión exitoso',
          });

          this.redirectToDashboard(tipo_persona);
        } else {
          this.errorMessage = res.message || 'Login Failed';
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.message,
          });
        }
        console.log(this.usuario);
      },
      error: () => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
        });
      },
    });
  }
}
