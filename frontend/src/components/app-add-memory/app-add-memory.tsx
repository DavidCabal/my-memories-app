import { Component, Prop } from '@stencil/core';
import { callApi } from '../../utils/fetchHelpers.js';

@Component({
  tag: 'app-add-memory',
  styleUrl: 'app-add-memory.css'
})

export class AppAddMemory {
  @Prop() saveSuccessFn;
  @Prop() showLoading;
  @Prop() hideLoading;

  memoryText = '';

  showSuccessMessage = () => {
    this.hideLoading();
    this.saveSuccessFn();
  };

  saveMemory = (memory) => {
    this.showLoading("Saving Memory...");
    callApi('INSERT THE URL FOR THE SAVE FUNCTION IN YOUR GC ACCOUNT', 'POST', {text: memory})
      .then(() => this.showSuccessMessage())
      .catch(error => console.log(error));
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
