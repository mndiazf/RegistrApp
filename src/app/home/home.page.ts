import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';

  //Recuperacion de dato utilizando extras state

  constructor() {
    const state = window.history.state;
    if (state && state.username) {
      this.username = state.username;
    }
  }
}
