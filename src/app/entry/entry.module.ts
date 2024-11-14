import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from '../../app/entry/entry-routing.module';
import { EntryComponent } from './entry.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SquaredProfileComponent } from '../components/squared-profile/squared-profile.component';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { ModifyProfileComponent } from './modify-profile/modify-profile.component';
import { SlideToggleComponent } from '../components/slide-toggle/slide-toggle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntryComponent,
    SquaredProfileComponent,
    EnterNameComponent,
    SlideToggleComponent,
    ModifyProfileComponent,
  ],
  imports: [
    CommonModule,
    EntryRoutingModule,
    AngularMaterialModule,
    FormsModule,
  ],
})
export class EntryModule {}
