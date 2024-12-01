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
    });
  }

  shuffleArray(array: iMovies[]): iMovies[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //Filtro i Film per categoria
  filterMoviesByCategory(category: string): iMovies[] {
    return this.movies.filter(
      (movie) => movie.categories && movie.categories.includes(category)
    );
  }
}
