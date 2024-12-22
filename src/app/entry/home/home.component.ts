import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iMovies } from '../../model/i-movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies: iMovies[] = [];
  movieGroups: iMovies[] = [];
  comedy: iMovies[] = [];
  family: iMovies[] = [];
  fantasy: iMovies[] = [];
  horror: iMovies[] = [];
  drama: iMovies[] = [];
  accountId!: string;

  filteredMovies: iMovies[] = [];
  searchQuery = '';
  groupedMovies: iMovies[][] = [];

  randomPoster!: iMovies;

  constructor(
    private moviesSvc: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getMovies();
    this.route.params.subscribe((params) => {
      this.accountId = params['id'];
      if (!this.router.url.includes('home')) {
        this.router.navigate([`/home/${this.accountId}/home`]);
      }
      console.log('Account ID:', this.accountId); // Verifica se l'ID viene letto correttamente
    });
  }

  getMovies(): void {
    this.moviesSvc.getAllMovies().subscribe((movie) => {
      this.movies = movie;
      this.movieGroups = this.shuffleArray(this.movies.slice());
      this.filteredMovies = movie;
      this.groupedMovies = this.groupMovies(movie, 6);
      this.updateCategories();
      this.getRandomPoster();
    });
  }

  shuffleArray(array: iMovies[]): iMovies[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //Random bg film
  getRandomPoster(): void {
    const randomIndex = Math.floor(Math.random() * this.filteredMovies.length);
    this.randomPoster = this.filteredMovies[randomIndex];
  }

  //Filtro i Film per categoria
  filterMoviesByCategory(category: string): iMovies[] {
    return this.movies.filter(
      (movie) => movie.categories && movie.categories.includes(category)
    );
  }

  updateCategories(): void {
    //Richiamo la categoria
    this.comedy = this.filterMoviesByCategory('comedy');
    this.family = this.filterMoviesByCategory('family');
    this.fantasy = this.filterMoviesByCategory('fantasy');
    this.horror = this.filterMoviesByCategory('horror');
    this.drama = this.filterMoviesByCategory('drama');

    // Verifica i film filtrati
    console.log('Comedy Movies:', this.comedy);
    console.log('Family Movies:', this.family);
    console.log('Fantasy Movies:', this.fantasy);
    console.log('Horror Movies:', this.horror);
    console.log('Drama Movies:', this.drama);
  }

  onSearchResults(event: { movies: iMovies[]; query: string }): void {
    this.filteredMovies = this.movies;
    this.searchQuery = event.query;
    this.groupedMovies = this.groupMovies(this.movies, 6);
    this.updateCategories();
  }

  // Funzione per formattare le categorie
  formatCategories(categories: string[]): string {
    return categories.join(' · ');
  }

  // Funzione per formattare la durata del film
  formatRuntime(runtime: number): string {
    if (!runtime) {
      return '0m';
    }
    if (runtime < 60) {
      return `${runtime}m`; // Esempio: 5 -> 5m, 45 -> 45m
    } else {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      if (minutes === 0) {
        return `${hours}h`; // Esempio: 120 -> 2h
      }
      return `${hours}h ${minutes}m`; // Esempio: 145 -> 2h 25m
    }
  }

  groupMovies(movies: iMovies[], groupSize: number): iMovies[][] {
    const grouped = [];
    for (let i = 0; i < movies.length; i += groupSize) {
      grouped.push(movies.slice(i, i + groupSize));
    }
    console.log(grouped);
    return grouped;
  }
}
