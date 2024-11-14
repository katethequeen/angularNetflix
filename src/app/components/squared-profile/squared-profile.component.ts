import { Component, Input } from '@angular/core';
import { iAccount } from '../../model/i-account';

@Component({
  selector: 'app-squared-profile',
  templateUrl: './squared-profile.component.html',
  styleUrl: './squared-profile.component.scss',
})
export class SquaredProfileComponent {
  @Input() managingProfile: boolean = false;
  @Input()
  account!: iAccount;
}
