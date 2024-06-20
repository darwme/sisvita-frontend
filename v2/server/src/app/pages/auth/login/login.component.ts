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
  data: any = {};
  loginForm: FormGroup;
  private readonly _formBuilder: FormBuilder;
  usuario!: Usuario;
  isEdited: boolean = false;
  errorMessage: any;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private dataService: DataService,
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

  getData(data: any) {
    this.dataService.setData(data);
    console.log(data);
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
          this.data = res.data;

          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Inicio de sesión exitoso',
          });
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
