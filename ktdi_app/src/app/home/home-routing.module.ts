import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { RoomRegistrationPage } from '../room-registration/room-registration.page';
import { DataResolverService } from '../resolver/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
