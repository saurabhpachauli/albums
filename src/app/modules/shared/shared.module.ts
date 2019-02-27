
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MakeshiftLightboxComponent } from './components/makeshift-lightbox/makeshift-lightbox.component';
import { RestApiService } from './services/rest-api.service';
import { StorageService } from './services/storage.service';
import { MessageService } from 'primeng/components/common/messageservice';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MakeshiftLightboxComponent
  ],
  exports: [
    MakeshiftLightboxComponent
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        RestApiService,
        StorageService,
        MessageService
      ]
    };
  }

  constructor() { }

}
