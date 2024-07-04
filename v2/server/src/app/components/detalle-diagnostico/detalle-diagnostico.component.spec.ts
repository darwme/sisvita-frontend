import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDiagnosticoComponent } from './detalle-diagnostico.component';

describe('DetalleDiagnosticoComponent', () => {
  let component: DetalleDiagnosticoComponent;
  let fixture: ComponentFixture<DetalleDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDiagnosticoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
