import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';

  //Recuperacion de dato utilizando extras state

  constructor(private route: ActivatedRoute) {
    const state = window.history.state;
    if (state && state.username) {
      this.username = state.username;
    }
  }
}
