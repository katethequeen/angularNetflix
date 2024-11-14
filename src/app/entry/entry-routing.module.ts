import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry.component';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { HomeComponent } from './home/home.component';
import { ModifyProfileComponent } from './modify-profile/modify-profile.component';

const routes: Routes = [
  {
    path: 'entry',
    component: EntryComponent,
  },
  {
    path: 'enter-name',
    component: EnterNameComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'modify/:id',
    component: ModifyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
