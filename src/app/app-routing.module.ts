import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'entry',
    loadChildren: () =>
      import('./entry/entry.module').then((m) => m.EntryModule),
  },
  {
    path: '**',
    redirectTo: 'entry',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
