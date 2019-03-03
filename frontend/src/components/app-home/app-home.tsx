import { Component, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})

export class AppHome {

  @State() showAppAddMemory = false;
  @State() showViewMemories = false;

  loadingIndicator;

  showAppAddMemoryFn = () => {
    this.showAppAddMemory = true;
    this.showViewMemories = false;
  };
  showViewMemoriesFn = () => {
    this.showAppAddMemory = false;
    this.showViewMemories = true;
  };

  saveSuccess = () => {
    this.showAppAddMemory = false;
    this.showViewMemories = false;
    this.saveSuccessToast();
  }

  saveSuccessToast = async () => {
    const toastController = document.querySelector('ion-toast-controller');
    await toastController.componentOnReady();
  
    const toast = await toastController.create({
      message: 'Memory Saved',
      showCloseButton: true,
      position: 'middle',
      closeButtonText: 'Dismiss',
      duration: 3000
    });
    return await toast.present();
  };

  showLoadingIndicator = async (loadingMessage) => {
    const loadingController = document.querySelector('ion-loading-controller');
    await loadingController.componentOnReady();
  
    this.loadingIndicator = await loadingController.create({
      message: loadingMessage,
      duration: 8000,
      animated: true,
      spinner: "bubbles"
    });
  
    await this.loadingIndicator.present();
  };

  hideLoadingIndicator = () => {
    this.loadingIndicator.dismiss();
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
          <app-add-memory saveSuccessFn={this.saveSuccess} 
          showLoading={this.showLoadingIndicator} hideLoading={this.hideLoadingIndicator}/>
        }
        {this.showViewMemories &&
          <app-get-memories showLoading={this.showLoadingIndicator} hideLoading={this.hideLoadingIndicator} />
        }
        <ion-toast-controller />
        <ion-loading-controller />
      </ion-content>
    ];
  }
}
