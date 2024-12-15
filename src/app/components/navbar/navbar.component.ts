import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { iAccount } from '../../model/i-account';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { iMovies } from '../../model/i-movies';
import { MoviesService } from '../../services/movies.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  account!: iAccount;
  accounts: iAccount[] = [];
  filteredAccounts: iAccount[] = [];

  @Output() searchResults = new EventEmitter<{
    movies: iMovies[];
    query: string;
  }>();
  showSearchBar = false;
  searchQuery = '';
  movies: iMovies[] = [];
  filteredMovies: iMovies[] = [];

  //SideNav
  @ViewChild('sidenav') sidenav!: MatSidenav;
  sidenavOpen: boolean = false;

  constructor(
    private accountSvc: AccountService,
    private route: ActivatedRoute,
    private movieSvc: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountSvc.getAccountById(params['id']).subscribe((account) => {
        this.account = account;
        this.getAllAccounts();
      });
    });
    this.getMovie();
    this.filterAccounts();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const toolbar = document.querySelector('mat-toolbar') as HTMLElement;
    const scrollY = window.scrollY;
    const maxScroll = 200;
    const opacity = Math.min(scrollY / maxScroll, 1);
    toolbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }

  toggleSearchBar(): void {
    this.showSearchBar = !this.showSearchBar;

    if (!this.showSearchBar) {
      this.searchQuery = '';
      this.filteredMovies = this.movies;
      this.searchResults.emit({ movies: this.filteredMovies, query: '' });
    }
  }

  getMovie(): void {
    this.movieSvc.getAllMovies().subscribe((movie) => {
      this.movies = movie;
      this.filteredMovies = movie;
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.toLowerCase();
    this.searchQuery = query;
    this.filteredMovies = this.movies.filter((movie) => {
      return movie.name.toLowerCase().includes(query);
    });
    this.searchResults.emit({ movies: this.filteredMovies, query });
  }

  //Trovo account per Dropdown
  filterAccounts(): void {
    this.filteredAccounts = this.accounts.filter(
      (acc) => acc.id != this.account.id
    );
  }

  getAllAccounts(): void {
    this.accountSvc.getAllAccount().subscribe((accounts) => {
      this.accounts = accounts;
      this.filterAccounts();
    });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    console.log('Sidenav opened');
  }
}
