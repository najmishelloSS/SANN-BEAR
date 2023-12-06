import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomRegistrationPage } from './room-registration.page';

const routes: Routes = [
  {
    path: '',
    component: RoomRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRegistrationPageRoutingModule {}
