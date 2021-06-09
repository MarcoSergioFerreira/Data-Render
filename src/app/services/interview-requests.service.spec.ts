import { TestBed } from '@angular/core/testing';

import { InterviewRequestsService } from './interview-requests.service';

describe('InterviewRequestsService', () => {
  let service: InterviewRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
