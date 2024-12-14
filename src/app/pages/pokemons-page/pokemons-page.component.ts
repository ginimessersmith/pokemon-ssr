import { ApplicationRef, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonService } from '../../pokemons/service/pokemon.service';
import { SimplePokemon } from '../../pokemons/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css'
})
export default class PokemonsPageComponent implements OnInit, OnDestroy {


  // // public isLoading = signal(true)
  // private appRef = inject(ApplicationRef)
  // private $appStatble = this.appRef.isStable.subscribe((isStable)=>{
  //   console.log({isStable})
  // })
  public pokemons = signal<SimplePokemon[]>([])
  private pokemonService = inject(PokemonService)
  private activetedRouter = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)

  public currentPage = toSignal<number>(
    this.activetedRouter.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  )
  ngOnInit(): void {
    this.loadPokemon()
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 2000);
  }

  ngOnDestroy(): void {
    // this.$appStatble.unsubscribe()
  }

  loadPokemon(nextPage: number = 0) {
    const pageToLoad = this.currentPage()! + nextPage
    // realizar navegacion con el pipe
    this.pokemonService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(()=>this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`))
      )
      .subscribe(pokemons => {
        // console.log({ pokemons })
        this.pokemons.set(pokemons)
      })
  }

}
