import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromProvider from './reducers/provider.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ProviderEffects} from './effects/provider.effects';
import {ListComponent} from './components/list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {UserModule} from '../user/user.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CreateComponent} from './components/create/create.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {ViewComponent} from './components/view/view.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BaseModule} from '../base/base.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProvider.providersFeatureKey, fromProvider.providersReducer),
    StoreModule.forFeature(fromProvider.providerFeatureKey, fromProvider.providerReducer),
    EffectsModule.forFeature([ProviderEffects]),
    MatTableModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatTabsModule,
    UserModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatTreeModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    BaseModule,
    MatSelectModule,
  ]
})
export class ProviderModule {
}
