import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPacientesComponent } from './gestionar-pacientes.component';

describe('GestionarPacientesComponent', () => {
  let component: GestionarPacientesComponent;
  let fixture: ComponentFixture<GestionarPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarPacientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
