import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  datoEstudiante$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
