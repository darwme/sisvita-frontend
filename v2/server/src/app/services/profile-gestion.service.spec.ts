import { TestBed } from '@angular/core/testing';

import { ProfileGestionService } from './profile-gestion.service';

describe('ProfileGestionService', () => {
  let service: ProfileGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
