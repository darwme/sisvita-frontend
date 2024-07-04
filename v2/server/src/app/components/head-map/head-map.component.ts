import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { enviroments } from '../../../../enviroments';
import { Loader } from '@googlemaps/js-api-loader';

interface Person {
  lat: number;
  lng: number;
  emotion: 'happy' | 'sad' | 'angry';
  createdAt: Date;
}

@Component({
  selector: 'app-head-map',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './head-map.component.html',
  styleUrl: './head-map.component.css',
})
export class HeadMapComponent implements OnInit {
  heatmapData: { location: google.maps.LatLng; weight: number }[] = [];
  private people: Person[] = [
    {
      lat: 37.7749,
      lng: -122.4194,
      emotion: 'happy',
      createdAt: new Date('2024-06-01'),
    },
    {
      lat: 37.7748,
      lng: -122.4195,
      emotion: 'sad',
      createdAt: new Date('2024-06-02'),
    },
    {
      lat: 37.7747,
      lng: -122.4196,
      emotion: 'angry',
      createdAt: new Date('2024-06-03'),
    },
    {
      lat: 37.7746,
      lng: -122.4197,
      emotion: 'happy',
      createdAt: new Date('2024-06-04'),
    },
    {
      lat: 37.7745,
      lng: -122.4198,
      emotion: 'sad',
      createdAt: new Date('2024-06-05'),
    },
    {
      lat: 37.7744,
      lng: -122.4199,
      emotion: 'angry',
      createdAt: new Date('2024-06-06'),
    },
    {
      lat: 37.7743,
      lng: -122.42,
      emotion: 'happy',
      createdAt: new Date('2024-06-07'),
    },
    {
      lat: 37.7742,
      lng: -122.4201,
      emotion: 'sad',
      createdAt: new Date('2024-06-08'),
    },
  ];

  private map: google.maps.Map | null = null;
  private heatmap: google.maps.visualization.HeatmapLayer | null = null;

  private emotionWeights = {
    happy: 1,
    sad: 2,
    angry: 3,
  };

  constructor() {}

  ngOnInit(): void {
    this.loadMap();
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
          center: { lat: 37.7, lng: -122.4 },
          zoom: 10,
        }
      );

      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapData,
        gradient: [
          'rgba(0, 255, 0, 0)', //verde happy
          'rgba(0, 255, 0, 1)', //verde
          'rgba(255, 255, 0, 1)', //amarillo
          'rgba(255, 0, 0, 1)', //rojo angry
        ],
        maxIntensity: 3,
        radius: 20,
        dissipating: true,
      });
      this.heatmap.setMap(this.map);

      this.updateHeatmap();
    });
  }

  private updateHeatmap(): void {
    this.heatmapData = this.people.map((person) => ({
      location: new google.maps.LatLng(person.lat, person.lng),
      weight: this.emotionWeights[person.emotion],
    }));
    if (this.heatmap) {
      this.heatmap.setData(this.heatmapData);
    }
  }

  onFilterChange(event: any): void {
    const emotionFilter = (
      document.getElementById('emotion') as HTMLSelectElement
    ).value;
    const startDate = (document.getElementById('startDate') as HTMLInputElement)
      .valueAsDate;
    const endDate = (document.getElementById('endDate') as HTMLInputElement)
      .valueAsDate;

    const filteredPeople = this.people.filter((person) => {
      const isEmotionMatch =
        emotionFilter === 'all' || person.emotion === emotionFilter;
      const isDateMatch =
        (!startDate || person.createdAt >= startDate) &&
        (!endDate || person.createdAt <= endDate);
      return isEmotionMatch && isDateMatch;
    });

    this.heatmapData = filteredPeople.map((person) => ({
      location: new google.maps.LatLng(person.lat, person.lng),
      weight: this.emotionWeights[person.emotion],
    }));
    if (this.heatmap) {
      this.heatmap.setData(this.heatmapData);
    }
  }
}
