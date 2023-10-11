import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoautorizadoPageRoutingModule } from './noautorizado-routing.module';

import { NoautorizadoPage } from './noautorizado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoautorizadoPageRoutingModule
  ],
  declarations: [NoautorizadoPage]
})
export class NoautorizadoPageModule {}
