import { Component, Input } from '@angular/core';
import { iMovies } from '../../model/i-movies';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @Input() title!: string;
  @Input() carouselId: string = '';

  @Input() movies: iMovies[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('Carousel Movies:', this.movies);
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
}
