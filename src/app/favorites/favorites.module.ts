import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [FavoritesPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  exports: [FavoritesPageComponent]
})
export class FavoritesModule { }
