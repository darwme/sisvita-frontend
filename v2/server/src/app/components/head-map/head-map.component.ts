import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { enviroments } from '../../../../enviroments';
import { Loader } from '@googlemaps/js-api-loader';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Historial_e } from '../../models/historial';

interface Person {
  y: number;
  x: number;
  rango:
    | 'Ansiedad mínima'
    | 'Ansiedad moderada'
    | 'Ansiedad severa'
    | 'Ansiedad extrema';
  fecha_realizada: Date;
}

interface FilterData {
  nombre_completo: string;
  test: string;
  y: number;
  x: number;
  rango:
    | 'Ansiedad mínima'
    | 'Ansiedad moderada'
    | 'Ansiedad severa'
    | 'Ansiedad extrema';
  fecha_realizada: Date;
}

@Component({
  selector: 'app-head-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './head-map.component.html',
  styleUrl: './head-map.component.css',
})
export class HeadMapComponent implements OnInit {
  heatmapData: { location: google.maps.LatLng; weight: number }[] = [];
  private people: Person[];

  private map: google.maps.Map | null = null;
  private heatmap: google.maps.visualization.HeatmapLayer | null = null;

  private rangoWeights = {
    'Ansiedad mínima': 1,
    'Ansiedad moderada': 2,
    'Ansiedad severa': 3,
    'Ansiedad extrema': 4,
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('datoz recibidoz: ', this.data);
    this.people = this.transformInputDataToListOfPerson(this.data);
    console.log('people: ', this.people);
  }

  ngOnInit(): void {
    this.loadMap();
  }

  transformInputDataToListOfPerson(inputData: any): Person[] {
    // Paso 1: Verificar si la entrada es un objeto. Si no, retornar un array vacío.
    if (typeof inputData !== 'object' || inputData === null) {
      return [];
    }

    // Paso 2: Convertir el objeto de entrada en un array de sus valores.
    const inputDataList = Object.values(inputData);

    // Paso 3: Aplicar la transformación existente al array.
    return inputDataList.map((inputData: any) => ({
      y: inputData.ubicacion.y,
      x: inputData.ubicacion.x,
      rango: inputData['diagnostico general'],
      fecha_realizada: new Date(inputData.fecha_realizada),
    }));
  }

  private loadMap(): void {
    const loader = new Loader({
      apiKey: enviroments.googleMapsApiKey,
      version: 'weekly',
      libraries: ['visualization'],
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: -12, lng: -77 },
          zoom: 10,
        }
      );

      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapData,
        gradient: [
          'rgba(0, 255, 0, 0)', //verde minima
          'rgba(0, 255, 0, 1)', //moderada
          'rgba(255, 255, 0, 1)', //zevera
          'rgba(255, 0, 0, 1)', //extrema
        ],
        maxIntensity: 4,
        radius: 20,
        dissipating: true,
      });
      this.heatmap.setMap(this.map);

      this.updateHeatmap();
    });
  }

  private updateHeatmap(): void {
    this.heatmapData = this.people.map((person) => ({
      location: new google.maps.LatLng(person.x, person.y),
      weight: this.rangoWeights[person.rango],
    }));
    if (this.heatmap) {
      this.heatmap.setData(this.heatmapData);
    }
  }

  onFilterChange(event: any): void {
    const emotionFilter = (
      document.getElementById('rango') as HTMLSelectElement
    ).value;
    const startDate = (document.getElementById('startDate') as HTMLInputElement)
      .valueAsDate;
    const endDate = (document.getElementById('endDate') as HTMLInputElement)
      .valueAsDate;

    const filteredPeople = this.people.filter((person) => {
      const isEmotionMatch =
        emotionFilter === 'all' || person.rango === emotionFilter;
      const isDateMatch =
        (!startDate || person.fecha_realizada >= startDate) &&
        (!endDate || person.fecha_realizada <= endDate);
      return isEmotionMatch && isDateMatch;
    });

    this.heatmapData = filteredPeople.map((person) => ({
      location: new google.maps.LatLng(person.x, person.y),
      weight: this.rangoWeights[person.rango],
    }));
    if (this.heatmap) {
      this.heatmap.setData(this.heatmapData);
    }
  }
}
