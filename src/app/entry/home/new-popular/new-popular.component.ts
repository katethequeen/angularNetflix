import { Component } from '@angular/core';
import { iMovies } from '../../../model/i-movies';
import { MoviesService } from '../../../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-popular',
  templateUrl: './new-popular.component.html',
  styleUrl: './new-popular.component.scss',
})
export class NewPopularComponent {
  movies: iMovies[] = [];
  comedy: iMovies[] = [];
  family: iMovies[] = [];
  fantasy: iMovies[] = [];
  horror: iMovies[] = [];
  drama: iMovies[] = [];
  accountId!: string;
  constructor(
    private moviesSvc: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.route.params.subscribe((params) => {
      this.accountId = params['id'];
      console.log('Account ID:', this.accountId); // Verifica se l'ID viene letto correttamente
    });
  }
  getMovies(): void {
    this.moviesSvc.getAllMovies().subscribe((movies) => {
      this.movies = movies;
      //Richiamo la categoria
      this.comedy = this.filterMoviesByCategory('comedy');
      this.family = this.filterMoviesByCategory('family');
      this.fantasy = this.filterMoviesByCategory('fantasy');
      this.horror = this.filterMoviesByCategory('horror');
      this.drama = this.filterMoviesByCategory('drama');
    });
  }
  filterMoviesByCategory(category: string): iMovies[] {
    return this.movies.filter(
      (movie) => movie.categories && movie.categories.includes(category)
    );
  }
}
