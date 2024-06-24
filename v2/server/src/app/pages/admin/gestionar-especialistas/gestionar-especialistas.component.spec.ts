import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarEspecialistasComponent } from './gestionar-especialistas.component';

describe('GestionarEspecialistasComponent', () => {
  let component: GestionarEspecialistasComponent;
  let fixture: ComponentFixture<GestionarEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarEspecialistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
