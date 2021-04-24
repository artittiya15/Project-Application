import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { GlobalVariables } from './common/global-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Train';
  showFiller = false;
  toggle(drawer: MatDrawer): void {
    // GlobalVariables.drawerWidthNow = drawer.opened ? drawer._getWidth() : 0;
    GlobalVariables.drawer = drawer;
  }
}
