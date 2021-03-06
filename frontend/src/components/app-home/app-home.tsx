import { Component, State } from '@stencil/core';
import { callApi } from '../../utils/fetchHelpers.js';
import * as urls from '../../constants.js';

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

  componentWillLoad() {
    callApi(urls.loginUrl, 'GET')
      .catch(() => {
        // do nothing
      });
  }

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

  hideLoadingIndicator = (retry = 1) => {
    if (this.loadingIndicator) {
      this.loadingIndicator.dismiss();
    } else if (retry > 0) {
      setTimeout(() => {
        this.hideLoadingIndicator(retry - 1);
      }, 1000);
    }
  };

  checkLogin = (value) => {
    this.showLoadingIndicator("Validating...");
    callApi(urls.loginUrl + value, 'GET')
      .then(response => {
        this.hideLoadingIndicator();
        if (response.status === 200) {
          this.preheatEndpoints();
          this.loggedIn = true;
        }
      })
      .catch(error => {
        this.hideLoadingIndicator();
        console.log(error);
      });
  };

  preheatEndpoints () {
    const endpoints = [ 
      { url: urls.saveUrl, callType: 'POST' }, 
      { url: urls.retrieveUrl, callType: 'GET' }, 
      { url: urls.editUrl, callType: 'POST' }, 
      { url: urls.deleteUrl, callType: 'POST' }
     ];
    endpoints.forEach(url => {
    callApi(url.url, url.callType, null, false)
      .catch(() => {
        // do nothing
      });
    });
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
                  <ion-label position="stacked">Login</ion-label>
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
          </div>
        }
        <ion-toast-controller />
        <ion-loading-controller />
      </ion-content>
    ];
  }
}
