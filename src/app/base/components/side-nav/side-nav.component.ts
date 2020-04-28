import {Component, Input} from '@angular/core';
import {NavElement} from './models/nav-element';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input()
  navElements: NavElement[];
}
