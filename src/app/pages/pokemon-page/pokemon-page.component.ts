import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { PokemonInterface } from '../../pokemons/interface/pokemon.interface';
import { PokemonService } from '../../pokemons/service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonPageComponent implements OnInit {

  private pokemonService = inject(PokemonService)
  public pokemon = signal<PokemonInterface | null>(null)
  private router = inject(ActivatedRoute)
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    const id: string = this.router.snapshot.paramMap.get('id') ?? ''
    this.pokemonService.loadPokemon(id)
      .pipe(
        tap(pokemon => {
          const pageTile = `#${pokemon.id} - ${pokemon.name}`
          const pageDescription = `Pagina del Pokemon ${pokemon.name}`
          this.title.setTitle(pageTile)
          this.meta.updateTag({ name: 'description', content: pageDescription })
          this.meta.updateTag({ name: 'og:title', content: pageTile })
          this.meta.updateTag({ name: 'og:description', content: pageDescription })
          this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` })
        })
      )
      .subscribe(pokemon => this.pokemon.set(pokemon))
  }


}
