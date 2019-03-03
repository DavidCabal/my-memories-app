import { Component, State } from '@stencil/core';
import { callApi } from '../../utils/fetchHelpers.js';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})

export class AppHome {

  @State() showAppAddMemory = false;
  @State() showViewMemories = false;
  @State() loggedIn = false;

  loginValue = '';
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

  checkLogin = (value) => {
    callApi('INSERT YOUR LOGIN FUNCTION URL PLUS "?login=" AT THE END' + value, 'GET')
      .then(response => {
        if (response.status === 200) {
          this.loggedIn = true;
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>My Memories</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding color="dark">
        {!this.loggedIn &&
          <ion-grid class="login-grid">
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-label position="floating">Login</ion-label>
                  <ion-input type="password" onIonChange={ev => this.loginValue = ev.detail.value}></ion-input>
                </ion-item>
                <ion-button onClick={() => this.checkLogin(this.loginValue)}>Validate</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        }
        {this.loggedIn &&
          <div>
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
                showLoading={this.showLoadingIndicator} hideLoading={this.hideLoadingIndicator} />
            }
            {this.showViewMemories &&
              <app-get-memories showLoading={this.showLoadingIndicator} hideLoading={this.hideLoadingIndicator} />
            }
            <ion-toast-controller />
            <ion-loading-controller />
          </div>
        }
      </ion-content>
    ];
  }
}
