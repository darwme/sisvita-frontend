import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadMapComponent } from './head-map.component';

describe('HeadMapComponent', () => {
  let component: HeadMapComponent;
  let fixture: ComponentFixture<HeadMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
