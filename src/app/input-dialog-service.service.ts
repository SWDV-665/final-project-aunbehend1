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


  async showPrompt(task?, index?) {
    const prompt = await this.alertCtrl.create({
      message: task ? "Please edit task..." : "Please enter task...",
      inputs: [
        {
          name: 'taskName',
          placeholder: 'taskName',
          value: task ? task.name : null
        },
        {
          name: 'date',
          placeholder: 'date',
          value: task ? task.date : null
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
          handler: task => {
            console.log('Saved clicked', task);
            if (index !== undefined) {
              this.dataService.editTask(task, index);
            }
            else {
              this.dataService.addTask(task);
            }

          }
        }
      ]
    });
    prompt.present();
  }

}