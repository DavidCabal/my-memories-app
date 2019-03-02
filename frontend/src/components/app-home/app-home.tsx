import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})

export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>My Memories</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding color="dark">
        <ion-button expand="block">Add New Memory</ion-button>
        <ion-button expand="block">View Memories</ion-button>
      </ion-content>
    ];
  }
}
