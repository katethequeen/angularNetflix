import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ShowComponent } from './show/show.component';
import { MoviesComponent } from './movies/movies.component';
import { NewPopularComponent } from './new-popular/new-popular.component';
import { MyListComponent } from './my-list/my-list.component';
import { FooterComponent } from '../../components/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    ShowComponent,
    MoviesComponent,
    NewPopularComponent,
    MyListComponent,
    FooterComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, AngularMaterialModule],
})
export class HomeModule {}
