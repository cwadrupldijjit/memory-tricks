import { TestBed } from '@angular/core/testing';

import { RemoveAPhraseService } from './remove-a-phrase.service';

describe('RemoveAPhraseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveAPhraseService = TestBed.get(RemoveAPhraseService);
    expect(service).toBeTruthy();
  });
});
