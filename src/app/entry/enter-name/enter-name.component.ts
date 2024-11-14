import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { iIcon } from '../../model/i-icon';
import { iAccount } from '../../model/i-account';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrl: './enter-name.component.scss',
})
export class EnterNameComponent implements OnInit {
  name: string = '';
  newAccount: Partial<iAccount> = {};
  icons: iIcon[] = [
    {
      name: 'https://occ-0-3161-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZumJ3wvSKM7od-r3UjhVF9j3yteWlQYA-51F3SNoI682llhul1Xf_CUkMnfP_17Md2lpOOhbwHeGufvo8kOTjptoS_bcwtniHKz.png',
      id: 1,
    },
    {
      name: 'https://occ-0-3161-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeM78olwut6-E9a31v0mK2aOySAqJ_Jejdvpxxq6I7hyJBZBKRy6RG--GTrl0q6iCHOT50vB9TCX4G2GUbN0e6r9GNJzjAvpnQ.png',
      id: 2,
    },
    {
      name: 'https://occ-0-3161-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZFf8nyPJvLrgkkrv_qMWr1ZsA3L3D3f5fvCxG-7Ey4NpzMS-lx6XiEie4CAdOItt7DAqg0y6x1_pbV5KvtzUrHkgKA9eNgmrQ.png',
      id: 3,
    },
    {
      name: 'https://occ-0-3161-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABQC_iTsdN1Oh4QbrsrOYYpf6el1T8CbDaVtV-VtYukuYyxgenT8b35wAIXA1lBw0Cob6FItS5AWqx5YsamDT69ks9b-2DojaEg.png',
      id: 4,
    },
    {
      name: 'https://occ-0-3161-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZEwZmUZB6H1tKp8gauZK6AhrM6mWfatr-y4LSGl1nWaD0hYc2NMRp6vknlM5jqt_Zds3X7aRfv69hxR_B0ipuG9kGY5ENFo3w.png',
      id: 5,
    },
    {
      name: 'https://occ-0-3161-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTknCQJjJQ0Dt1EqIktQSx1L_BuuMA_5mE6Ch-e39lEpO2K5PwNj9Ql96OSNHtWHwNIpN0qeRvGdzdO8FolxaQxnWNlBdvdC8g.png',
      id: 6,
    },
  ];
  selectedIcon: iIcon | undefined;
  usedIcon: iIcon[] = [];

  constructor(private accountSvc: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.shuffleIcons();
    this.getNewIcon();
  }

  shuffleIcons(): void {
    for (let i = this.icons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.icons[i], this.icons[j]] = [this.icons[j], this.icons[i]];
    }
  }

  getNewIcon(): void {
    const unusedIcons = this.icons.filter(
      (icon) => !this.usedIcon.includes(icon)
    );
    if (unusedIcons.length > 0) {
      this.selectedIcon = unusedIcons.shift();
      this.usedIcon.push(this.selectedIcon!);
    } else {
      console.error('No more icons available');
    }
  }

  onSubmit() {
    this.newAccount = {
      name: this.name,
      icon: this.selectedIcon?.name,
    };
    this.accountSvc.createAccount(this.newAccount).subscribe((account) => {
      this.getNewIcon();
      this.router.navigate(['/entry']);
    });
  }
}
