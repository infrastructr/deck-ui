import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/components/login/login.component';
import {ListComponent as ProjectListComponent} from './project/components/list/list.component';
import {CreateComponent as ProjectCreateComponent} from './project/components/create/create.component';
import {ViewComponent as ProjectViewComponent} from './project/components/view/view.component';
import {StoreModule} from '@ngrx/store';
import {routerReducer, RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {ListComponent as HostListComponent} from './host/components/list/list.component';
import {CreateComponent as HostCreateComponent} from './host/components/create/create.component';
import {ViewComponent as HostViewComponent} from './host/components/view/view.component';
import {ListComponent as ProviderListComponent} from './provider/components/list/list.component';
import {ViewComponent as ProviderViewComponent} from './provider/components/view/view.component';
import {CreateComponent as ProviderCreateComponent} from './provider/components/create/create.component';
import {ListComponent as InventoryListComponent} from './inventory/components/list/list.component';
import {ViewComponent as InventoryViewComponent} from './inventory/components/view/view.component';
import {CreateComponent as InventoryCreateComponent} from './inventory/components/create/create.component';
import {ListComponent as GroupListComponent} from './group/components/list/list.component';
import {ViewComponent as GroupViewComponent} from './group/components/view/view.component';
import {CreateComponent as GroupCreateComponent} from './group/components/create/create.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'},
  },
  {
    path: 'projects/create',
    component: ProjectCreateComponent,
    data: {title: 'New Project'}
  },
  {
    path: 'projects',
    component: ProjectListComponent,
    data: {title: 'Projects'},
  },
  {
    path: 'projects/:projectId',
    component: ProjectViewComponent,
    data: {title: 'Project'},
  },
  {
    path: 'projects/:projectId/inventories/:inventoryId/hosts',
    component: HostListComponent,
    data: {title: 'Hosts'},
  },
  {
    path: 'projects/:projectId/inventories/:inventoryId/hosts/create',
    component: HostCreateComponent,
    data: {title: 'New Host'},
  },
  {
    path: 'projects/:projectId/inventories/:inventoryId/hosts/:hostId',
    component: HostViewComponent,
    data: {title: 'Host'},
  },
  {
    path: 'projects/:projectId/inventories/:inventoryId/groups',
    component: GroupListComponent,
    data: {title: 'Groups'},
  },
  {
    path: 'projects/:projectId/inventories/:inventoryId/groups/create',
    component: GroupCreateComponent,
    data: {title: 'New Group'},
  },
  {
    path: 'projects/:projectId/inventories/:inventoryId/groups/:groupId',
    component: GroupViewComponent,
    data: {title: 'Group'},
  },
  {
    path: 'providers',
    component: ProviderListComponent,
    data: {title: 'Providers'},
  },
  {
    path: 'providers/create',
    component: ProviderCreateComponent,
    data: {title: 'New Provider'}
  },
  {
    path: 'providers/:providerId',
    component: ProviderViewComponent,
    data: {title: 'Provider'},
  },
  {
    path: 'projects/:projectId/inventories',
    component: InventoryListComponent,
    data: {title: 'Inventories'},
  },
  {
    path: 'projects/:projectId/inventories/create',
    component: InventoryCreateComponent,
    data: {title: 'New Inventory'},
  },
  {
    path: 'projects/:projectId/inventories/:inventoryId',
    component: InventoryViewComponent,
    data: {title: 'Inventory'},
  },
  {
    path: '**',
    redirectTo: '/projects',
  },
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routingConfiguration),
    StoreModule.forFeature('router', routerReducer),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
