import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { taskServiceProvider } from './task-service.service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: taskServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }


  async showPrompt(item?, index?) {
    const prompt = await this.alertCtrl.create({
      message: item ? "Please edit item..." : "Please enter item...",
      inputs: [
        {
          name: 'taskName',
          placeholder: 'taskName',
          value: item ? item.name : null
        },
        {
          name: 'date',
          placeholder: 'date',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }

          }
        }
      ]
    });
    prompt.present();
  }

}