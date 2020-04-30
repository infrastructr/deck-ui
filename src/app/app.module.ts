import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './user/effects/user.effects';
import {FormsModule} from '@angular/forms';
import {UserModule} from './user/user.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProjectModule} from './project/project.module';
import {HostModule} from './host/host.module';
import {Router} from '@angular/router';
import {AuthInterceptor} from './auth/authentication-interceptor';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTreeModule} from '@angular/material/tree';
import {BaseModule} from './base/base.module';
import {ProviderModule} from './provider/provider.module';
import {InventoryModule} from './inventory/inventory.module';
import {GroupModule} from './group/group.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    UserModule,
    StoreModule.forRoot([], {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      UserEffects,
    ]),
    FormsModule,
    MatProgressSpinnerModule,
    ProjectModule,
    ProviderModule,
    InventoryModule,
    HostModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    BaseModule,
    GroupModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (router: Router) => {
        return new AuthInterceptor(router);
      },
      multi: true,
      deps: [Router]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
