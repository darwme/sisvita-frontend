import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCitaComponent } from './visualizar-cita.component';

describe('VisualizarCitaComponent', () => {
  let component: VisualizarCitaComponent;
  let fixture: ComponentFixture<VisualizarCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarCitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
