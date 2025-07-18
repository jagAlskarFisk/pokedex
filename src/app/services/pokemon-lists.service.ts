import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonListsService {
  private readonly CAUGHT_KEY = 'pokemonCaught';
  private readonly WISHLIST_KEY = 'pokemonWishlist';

  readonly pokemonCaught = signal<string[]>([]);
  readonly pokemonWishlist = signal<string[]>([]);

  constructor() {
    this.initializeFromLocalStorage();
  }

  private initializeFromLocalStorage(): void {
    const caughtList = localStorage.getItem(this.CAUGHT_KEY);
    const wishlist = localStorage.getItem(this.WISHLIST_KEY);

    if (caughtList) {
      this.pokemonCaught.set(JSON.parse(caughtList));
    }

    if (wishlist) {
      this.pokemonWishlist.set(JSON.parse(wishlist));
    }
  }

  addToCaught(pokemonName: string): void {
    const currentList = this.pokemonCaught();
    if (!currentList.includes(pokemonName)) {
      const newList = [...currentList, pokemonName];
      this.pokemonCaught.set(newList);
      localStorage.setItem(this.CAUGHT_KEY, JSON.stringify(newList));
    }
  }

  removeFromCaught(pokemonName: string): void {
    const currentList = this.pokemonCaught();
    const newList = currentList.filter(name => name !== pokemonName);
    this.pokemonCaught.set(newList);
    localStorage.setItem(this.CAUGHT_KEY, JSON.stringify(newList));
  }

  addToWishlist(pokemonName: string): void {
    const currentList = this.pokemonWishlist();
    if (!currentList.includes(pokemonName)) {
      const newList = [...currentList, pokemonName];
      this.pokemonWishlist.set(newList);
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(newList));
    }
  }

  removeFromWishlist(pokemonName: string): void {
    const currentList = this.pokemonWishlist();
    const newList = currentList.filter(name => name !== pokemonName);
    this.pokemonWishlist.set(newList);
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(newList));
  }

  isCaught(pokemonName: string): boolean {
    return this.pokemonCaught().includes(pokemonName);
  }

  isInWishlist(pokemonName: string): boolean {
    return this.pokemonWishlist().includes(pokemonName);
  }
}
