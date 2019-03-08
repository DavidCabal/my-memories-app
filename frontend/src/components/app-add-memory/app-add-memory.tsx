import { Component, Prop } from '@stencil/core';
import { callApi } from '../../utils/fetchHelpers.js';
import { saveUrl } from '../../constants.js';

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
    callApi(saveUrl, 'POST', { text: memory })
      .then(response => {
        if (response.status === 200) {
          this.showSuccessMessage();
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    return [
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked">add new memory here</ion-label>
              <ion-textarea onIonChange={ev => this.memoryText = ev.detail.value}></ion-textarea>
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
