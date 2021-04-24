import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { GlobalVariables } from './common/global-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Train';
  showFiller = false;
  totalItem: number = 0;
  constructor() {}
  ngOnInit(): void {
    const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    this.totalItem = carts.length;
    GlobalVariables.totalItemInCart.subscribe(() => {
      this.totalItem++;
    });
  }
  toggle(drawer: MatDrawer): void {
    // GlobalVariables.drawerWidthNow = drawer.opened ? drawer._getWidth() : 0;
    GlobalVariables.drawer = drawer;
  }
}
