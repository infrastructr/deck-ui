import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './components/data-table/data-table.component';
import {PageComponent} from './components/page/page.component';
import {NavComponent} from './components/nav/nav.component';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    NavComponent,
    SideNavComponent,
    PageComponent,
    DataTableComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    RouterModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    NavComponent,
    SideNavComponent,
    DataTableComponent,
    PageComponent
  ],
})
export class BaseModule {
}
