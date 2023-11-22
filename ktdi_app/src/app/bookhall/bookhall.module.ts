import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookhallPageRoutingModule } from './bookhall-routing.module';

import { BookhallPage } from './bookhall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookhallPageRoutingModule
  ],
  declarations: [BookhallPage]
})
export class BookhallPageModule {}
