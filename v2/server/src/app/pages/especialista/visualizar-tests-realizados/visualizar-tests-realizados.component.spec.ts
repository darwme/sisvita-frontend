import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarTestsRealizadosComponent } from './visualizar-tests-realizados.component';

describe('VisualizarTestsRealizadosComponent', () => {
  let component: VisualizarTestsRealizadosComponent;
  let fixture: ComponentFixture<VisualizarTestsRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarTestsRealizadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarTestsRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
