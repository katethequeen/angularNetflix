import { Component } from '@angular/core';
import { iAccount } from '../model/i-account';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  managingProfile: boolean = false;
  accounts: iAccount[] = [];
  accountsLoaded: boolean = false;
  maxProfiles: number = 5;

  constructor(private accountSvc: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountSvc.getAllAccount().subscribe((accounts) => {
      this.accounts = accounts;
      this.accountsLoaded = true;
      console.log(this.accounts);
    });
  }

  toggleManaging(): void {
    this.managingProfile = !this.managingProfile;
  }

  hasAddIcon(): boolean {
    if (!this.accountsLoaded) {
      return false;
    }
    const hasAdd = this.accounts.some((account) => !account.icon);
    console.log('hasAddIcon', hasAdd);
    console.log('Accounts state', this.accounts);
    return hasAdd;
  }

  getPlaceholderProfiles(): any[] {
    const placeholders = [];
    const totalSlots = Math.max(this.maxProfiles - this.accounts.length, 0);
    for (let i = 0; i < totalSlots; i++) {
      placeholders.push({ name: 'Aggiungi un profilo', icon: '' });
    }
    return placeholders;
  }
}
