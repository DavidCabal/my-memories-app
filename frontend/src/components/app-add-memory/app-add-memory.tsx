import { Component } from '@stencil/core';

@Component({
  tag: 'app-add-memory',
  styleUrl: 'app-add-memory.css'
})

export class AppAddMemory {

  memoryText = '';

  saveMemory = (memory) => {
    console.log(memory);
  };

  render() {
    return [
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">add new memory here</ion-label>
              <ion-input onIonChange={ev => this.memoryText = ev.detail.value}></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row justify-content-center>
          <ion-col>
            <ion-button size="small" onClick={() => this.saveMemory(this.memoryText)}>Save</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    ];
  }
}
