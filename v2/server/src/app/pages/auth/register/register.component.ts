import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators, // Add this line
} from '@angular/forms';
import { Paciente } from '../../../models/paciente';
import { Persona, Sexo, EstadoCivil } from '../../../models/persona';
import { Usuario } from '../../../models/usuario';
import {
  MatCard,
  MatCardContent,
  MatCardModule,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LogoComponent } from '../../../components/logo/logo.component';

@Component({
  selector: 'app-register',
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
    MatSelectModule,
    HttpClientModule,
    RouterModule,
    LogoComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  pacienteForm: FormGroup;
  private readonly _formBuilder: FormBuilder;
  paciente!: Paciente;
  isEdited: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    formBuilder: FormBuilder
  ) {
    this._formBuilder = formBuilder;
    this.pacienteForm = this._formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      sexo: Sexo.M,
      estado_civil: EstadoCivil.S,
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      clave: ['', Validators.required],
      confirmClave: ['', Validators.required],
    });
  }

  onSuceessfulRegister() {
    Swal.fire({
      title: 'Good job!',
      text: 'You are registered!',
      icon: 'success',
    });
  }

  onErrorMessage(error: string = '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    });
  }

  /*onRegister() {
    this.http
      .post('http://localhost:5000/auth/v1/register', this.registerObj)
      .subscribe({
        next: (res: any) => {
          if (res.status === 201) {
            this.onSuccessfulRegister();
            this.route.navigateByUrl('/login');
          } else {
            this.onErrorMessage(res.message || 'Register Failed');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.onErrorMessage(err.error.error);
        },
      });
  }*/

  registrarPaciente(): void {
    this.paciente = this.pacienteForm.value as Paciente;
    this.authService.registerPaciente(this.paciente).subscribe({
      next: () => {
        console.log(this.paciente);
        //this.personaForm.reset();
        //this.getPersonas();
      },
      error: () => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al registrar!',
        });
      },
      complete: () => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'registrarPersona....',
          text: '!Se registro exitosamente los datos de la persona!',
        });
      },
    });
  }

  clickRegister() {
    this.paciente = this.pacienteForm.value as Paciente;
    console.log('paciente', this.paciente);
  }
}
export const crossPasswordMatchValidator: ValidatorFn = (
  formGroupControl: AbstractControl<{ clave: string; confirmClave: string }>
): ValidationErrors | null => {
  const clave = formGroupControl.value.clave;
  const confirmClave = formGroupControl.value.confirmClave;

  return clave !== confirmClave ? { crossConfirmClaveError: true } : null;
};
