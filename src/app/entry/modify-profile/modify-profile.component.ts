import { ActivatedRoute, Router } from '@angular/router';
import { iAccount } from '../../model/i-account';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.scss',
})
export class ModifyProfileComponent implements OnInit {
  account!: iAccount;
  accounts: iAccount[] = [];
  constructor(
    private accountSvc: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountSvc.getAccountById(params['id']).subscribe((account) => {
        this.account = account;
      });
    });
  }

  // getAccount() {
  //   return this.accountSvc.modifyAccount();
  // }

  save() {
    this.accountSvc.modifyAccount(this.account).subscribe(() => {
      this.router.navigate(['/entry']);
    });
  }

  delete(id: number) {
    this.accountSvc.deleteAccount(id).subscribe(() => {
      this.accounts = this.accounts.filter((account) => account.id !== id);
      this.router.navigate(['/entry']);
    });
  }
}
