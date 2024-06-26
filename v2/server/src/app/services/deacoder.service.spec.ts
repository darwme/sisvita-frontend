import { TestBed } from '@angular/core/testing';

import { DeacoderService } from './deacoder.service';

describe('DeacoderService', () => {
  let service: DeacoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeacoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
