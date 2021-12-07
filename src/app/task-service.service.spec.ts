import { TestBed } from '@angular/core/testing';

import { taskServiceProvider } from './task-service.service';

describe('taskServiceService', () => {
  let service: taskServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(taskServiceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
