import { Component, HostListener, Input } from '@angular/core';
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

  cardsPerSlide = 6;

  constructor() {}

  ngOnInit(): void {
    console.log('Carousel Movies:', this.movies);
    this.updateCardsPerSlide();
  }

  //Resize delle card in base alla grandezza dello schermo
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCardsPerSlide();
  }

  updateCardsPerSlide() {
    const width = window.innerWidth;
    if (width <= 580) {
      this.cardsPerSlide = 2;
    } else if (width <= 740) {
      this.cardsPerSlide = 4;
    } else if (width <= 860) {
      this.cardsPerSlide = 5;
    } else {
      this.cardsPerSlide = 6;
    }
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
