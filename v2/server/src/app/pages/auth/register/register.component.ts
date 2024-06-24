import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
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
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UbicacionService } from '../../../services/ubicacion.service';
import { Distrito, Ubicacion } from '../../../models/ubicacion';
import { MatSelectionList } from '@angular/material/list';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatSelectionList,
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
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  pacienteForm: FormGroup;
  private readonly _formBuilder: FormBuilder;
  ubicaciones: Ubicacion[] = [];
  provincias: string[] = [];
  selectedDistrito: string = '';
  selectedProvincia: string = '';
  distritosOfSelectedProvincia: Distrito[] = [];
  selectedOption?: Ubicacion;
  paciente!: Paciente;
  isEdited: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private ubicacionService: UbicacionService,
    formBuilder: FormBuilder
  ) {
    this.getAllUbicaciones();
    this._formBuilder = formBuilder;
    this.pacienteForm = this._formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      ubigeo: '',
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
      antecedentes: 'ninguna',
      codigo_paciente: 'RANDOM',
      tipo_persona: 'paciente',
    });
  }

  onProvinciaChange(data: string) {
    this.selectedDistrito = '';
    console.log('Distrito anterior seleccionado: ', this.selectedDistrito);
    this.selectedProvincia = data;
    this.distritosOfSelectedProvincia = this.ubicaciones.find(
      (ubicacion) => ubicacion.nombre === data
    )?.distritos as Distrito[];
    console.log('Distritos: ', this.distritosOfSelectedProvincia);
  }

  onDistritoChange(data: string) {
    console.log('Distrito: ', data);
    this.selectedDistrito = data;
    console.log('Selected distrito: ', this.selectedDistrito);
  }

  findIdUbicacion(provincia: string, distrito: string): string {
    const ubicacion = this.ubicaciones.find(
      (ubicacion) => ubicacion.nombre === provincia
    );
    const distritoObj = ubicacion?.distritos.find(
      (distritoObj) => distritoObj.nombre === distrito
    );
    return distritoObj?.ubigeo as string;
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

  ngOnInit() {
    /*
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );*/
  }

  /*
  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }
    */

  getAllUbicaciones() {
    this.ubicacionService.getAllUbicaciones().subscribe(
      (result: any) => {
        this.ubicaciones = result;
        console.log('Ubicaciones: ', this.ubicaciones);
        this.getProvincias();
        console.log('Provincias: ', this.provincias);
        this.getProvincias();
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar las ubicaciones',
          text: err.error.message,
        });
      }
    );
  }

  getProvincias() {
    this.provincias = [
      ...new Set(this.ubicaciones.map((ubicacion) => ubicacion.nombre)),
    ];
    console.log('Provincias: ', this.provincias);
  }

  registrarPaciente(): void {
    this.paciente = this.pacienteForm.value as Paciente;
    this.authService.registerPaciente(this.paciente).subscribe({
      next: () => {
        console.log(this.paciente);
        //this.personaForm.reset();
        //this.getPersonas();
      },
      error: (error: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: error,
        });
      },
      complete: () => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'registrarPaciente....',
          text: '!Se registro exitosamente los datos!',
        });
      },
    });
  }

  clickRegister() {
    console.log('provincia', this.selectedProvincia);
    console.log('distrito', this.selectedDistrito);
    this.pacienteForm.value.ubigeo = this.findIdUbicacion(
      this.selectedProvincia,
      this.selectedDistrito
    );
    console.log('paciente form: ', this.pacienteForm.value);
    this.paciente = this.pacienteForm.value as Paciente;

    console.log('paciente', this.paciente);
    this.registrarPaciente();
  }
}
export const crossPasswordMatchValidator: ValidatorFn = (
  formGroupControl: AbstractControl<{ clave: string; confirmClave: string }>
): ValidationErrors | null => {
  const clave = formGroupControl.value.clave;
  const confirmClave = formGroupControl.value.confirmClave;

  return clave !== confirmClave ? { crossConfirmClaveError: true } : null;
};
