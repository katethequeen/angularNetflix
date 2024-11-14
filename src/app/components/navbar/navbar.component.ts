import { Component, HostListener } from '@angular/core';
import { iAccount } from '../../model/i-account';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  account!: iAccount;
  accounts: iAccount[] = [];
  constructor(
    private accountSvc: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountSvc.getAccountById(params['id']).subscribe((account) => {
        this.account = account;
      });
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const toolbar = document.querySelector('mat-toolbar') as HTMLElement;
    const scrollY = window.scrollY;
    const maxScroll = 200;
    const opacity = Math.min(scrollY / maxScroll, 1);
    toolbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }
}
