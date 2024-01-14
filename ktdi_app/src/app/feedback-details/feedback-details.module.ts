import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackDetailsPageRoutingModule } from './feedback-details-routing.module';

import { FeedbackDetailsPage } from './feedback-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackDetailsPageRoutingModule
  ],
  declarations: [FeedbackDetailsPage]
})
export class FeedbackDetailsPageModule {}
