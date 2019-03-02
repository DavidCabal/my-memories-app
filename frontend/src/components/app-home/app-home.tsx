import { Component, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})

export class AppHome {

  @State() showAppAddMemory = false;
  @State() showViewMemories = false;

  showAppAddMemoryFn = () => {
    this.showAppAddMemory = true;
    this.showViewMemories = false;
  };
  showViewMemoriesFn = () => {
    this.showAppAddMemory = false;
    this.showViewMemories = true;
  };

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>My Memories</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding color="dark">
        <ion-grid>
          <ion-row justify-content-center>
            <ion-col>
              <ion-button size="small" onClick={() => this.showAppAddMemoryFn()}>Add Memory</ion-button>
            </ion-col>
            <ion-col>
              <ion-button size="small" onClick={() => this.showViewMemoriesFn()}>View Memories</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        {this.showAppAddMemory &&
          <app-add-memory />
        }
      </ion-content>
    ];
  }
}
