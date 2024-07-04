import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionDocComponent } from './evaluacion-doc.component';

describe('EvaluacionDocComponent', () => {
  let component: EvaluacionDocComponent;
  let fixture: ComponentFixture<EvaluacionDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
