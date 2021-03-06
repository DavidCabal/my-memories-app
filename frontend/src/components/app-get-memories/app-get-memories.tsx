import { Component, State, Prop } from '@stencil/core';
import { callApi } from '../../utils/fetchHelpers.js';
import { retrieveUrl, editUrl, deleteUrl } from '../../constants.js';

@Component({
  tag: 'app-get-memories',
  styleUrl: 'app-get-memories.css'
})

export class AppGetMemories {

  @State() showMemoryList = false;
  @State() showYearPicker = false;
  @State() specificYear;
  @Prop() showLoading;
  @Prop() hideLoading;

  memoryList = [];

  showMemoryOptions = async (mem) => {
    const alertController = document.querySelector('ion-alert-controller');
    await alertController.componentOnReady();
    const alert = await alertController.create({
      header: 'Memory Options',
      message: '<textarea id="editedMemoryInput" style="height:15vh;width:100%;border: 1px solid black;">' +
        mem.text + '</textarea>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Save',
          cssClass: 'primary',
          handler: () => {
            const updatedValue = document.getElementById("editedMemoryInput") as HTMLInputElement;
            this.updateMemory(updatedValue.value, mem);
            alert.dismiss();
          }
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            alert.dismiss();
            this.confirmMemoryDelete(mem);
          }
        }
      ]
    });
    return await alert.present();
  };

  confirmMemoryDelete = async (mem) => {
    const alertController = document.querySelector('ion-alert-controller');
    await alertController.componentOnReady();
    const alert = await alertController.create({
      header: 'Delete Memory?',
      message: mem.text,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'Delete Forever',
          cssClass: 'danger',
          handler: () => {
            this.deleteMemory(mem.fullDate);
            alert.dismiss();
          }
        }
      ]
    });
    return await alert.present();
  };

  deleteMemory = (memID) => {
    this.showLoading("Deleting Memory...");
    callApi(deleteUrl, 'POST', { fullDate: memID })
      .then(() => {
        this.hideLoading();
        this.retrieve();
      })
      .catch(error => console.log(error));
  };

  buildMemoryList = (memories) => {
    this.showMemoryList = false;
    this.memoryList = [];
    memories.forEach((mem, index) => {
      this.memoryList.push(
        <ion-card color="light" key={index}>
          <ion-card-header>
            <ion-card-subtitle>
              {mem.month}/{mem.year}
              <ion-icon name="more" onClick={() => this.showMemoryOptions(mem)}></ion-icon>
            </ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>{mem.text}</ion-card-content>
        </ion-card>
      );
    });
    this.showMemoryList = true;
  };

  updateMemory = (updatedText, mem) => {
    this.showLoading("Updating Memory...");
    callApi(editUrl, 'POST', { text: updatedText, fullDate: mem.fullDate, month: mem.month, year: mem.year })
      .then(() => {
        this.hideLoading();
        this.retrieve();
      })
      .catch(error => console.log(error));
  };

  retrieve = () => {
    this.showLoading("Retrieving Memories...");
    const allOrByYear = this.specificYear == null ? 'retrieveAll' : ('retrieveByYear?year=' + this.specificYear);
    callApi(retrieveUrl + allOrByYear, 'GET')
      .then(response => response.json())
      .then(response => {
        this.hideLoading();
        return response;
      })
      .then(response => this.buildMemoryList(response));
  };

  yearPickerChange = (value) => {
    this.showYearPicker = value.detail.checked;
    if (!value.detail.checked) {
      this.specificYear = null;
    }
  };

  render() {
    return [
      <ion-grid>
        <div>
          <ion-row justify-content-center>
            <ion-col>
              <ion-item color="dark">
                <ion-label>Specific Year?</ion-label>
                <ion-checkbox color="primary" slot="start"
                  onIonChange={v => this.yearPickerChange(v)}></ion-checkbox>
              </ion-item>
            </ion-col>
            {this.showYearPicker &&
              <ion-item color="dark">
                <ion-button>Pick Year</ion-button>
                <ion-datetime display-format="YYYY" picker-format="YYYY"
                  onIonChange={v => this.specificYear = v.detail.value}></ion-datetime>
              </ion-item>
            }
          </ion-row>
        </div>
        <ion-row justify-content-center>
          <ion-col>
            <ion-button onClick={() => this.retrieve()}>Fetch Memories</ion-button>
          </ion-col>
        </ion-row>
        {this.showMemoryList &&
          <ion-row justify-content-center>
            {this.memoryList.length > 0 &&
              <ion-col class="card-width">
                {this.memoryList}
              </ion-col>
            }
            {this.memoryList.length === 0 &&
              <ion-col class="card-width">
                <ion-card color="light">
                  <ion-card-header>
                    <ion-card-title>no memories found</ion-card-title>
                  </ion-card-header>
                </ion-card>
              </ion-col>
            }
          </ion-row>
        }
        <ion-alert-controller />
      </ion-grid>
    ];
  }
}
