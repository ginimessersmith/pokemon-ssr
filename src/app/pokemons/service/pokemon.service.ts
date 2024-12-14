import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { PokemonAPIResponseInterface, SimplePokemon } from '../interface';
import { PokemonInterface } from '../interface/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)
  constructor() { }

  loadPage(page: number): Observable<SimplePokemon[]> {
    if (page != 0) {
      --page
    }

    page = Math.max(0, page)

    return this.http.get<PokemonAPIResponseInterface>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map(resp => {
          const simplePokemon: SimplePokemon[] = resp.results.map(pokemon => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name
          }))

          return simplePokemon
        }),
        tap(pokemons => console.log({ pokemons }))
      )
  }

  loadPokemon(id: string) {
    return this.http.get<PokemonInterface>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

}
