import { TestBed } from '@angular/core/testing';

import { PokemonListsService } from './pokemon-lists.service';

describe('PokemonListsService', () => {
  let service: PokemonListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
