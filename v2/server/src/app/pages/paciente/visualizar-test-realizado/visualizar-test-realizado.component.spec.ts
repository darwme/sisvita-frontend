import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarTestRealizadoComponent } from './visualizar-test-realizado.component';

describe('VisualizarTestRealizadoComponent', () => {
  let component: VisualizarTestRealizadoComponent;
  let fixture: ComponentFixture<VisualizarTestRealizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarTestRealizadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarTestRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
