import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { iMovies } from '../../model/i-movies';
import { iAccount } from '../../model/i-account';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies: iMovies[] = [];
  movieGroups: iMovies[] = [];

  constructor(
    private moviesSvc: MoviesService,
    private accountSvc: AccountService
  ) {}
  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(): void {
    this.moviesSvc.getAllMovies().subscribe((movie) => {
      this.movies = movie;
      this.movieGroups = this.shuffleArray(this.movies.slice());
    });
  }

  shuffleArray(array: iMovies[]): iMovies[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
