import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from '../../models/test';
import { Seccion } from '../../models/seccion';
import { Pregunta } from '../../models/pregunta';
import { Situacion } from '../../models/situacion';
import { Opcion } from '../../models/opcion';
import { Rango } from '../../models/rango';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  jsonFile: any;
  tests: Test[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadJson();
  }

  loadJson() {
    this.http.get('../../assets/test-info.json').subscribe(
      (data) => {
        this.jsonFile = data;
        console.log(this.jsonFile);
        const dataTest = this.jsonFile.test;
        if (typeof dataTest !== 'undefined' && !Array.isArray(dataTest)) {
          this.tests = Object.keys(dataTest).map((key: string) => {
            console.log('test: ', `${key}`, dataTest[key]);
            return dataTest[key];
          });
          console.log('test is an object: ', this.tests);
        } else {
          console.log('test is not an object');
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  getTestName(test: Test): string {
    return test.nombre;
  }

  getTestDescription(test: Test): number {
    return test.cant_seccion;
  }
}
