import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { StorageService } from './modules/shared/services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpErrorHandler } from './modules/shared/services/http-error-handler.service';
import { ListUsersComponent } from './modules/users/pages/list-users/list-users.component';
import { UserViewComponent } from './modules/users/components/user-view/user-view.component';
import { UserService } from './modules/users/services/user.service';
import { AlbumViewComponent } from './modules/users/components/album-view/album-view.component';
import { ListAlbumsComponent } from './modules/users/pages/list-albums/list-albums.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    UserViewComponent,
    AlbumViewComponent,
    ListAlbumsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [HttpErrorHandler, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
