import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { taskServiceProvider } from "../task-service.service"
import { InputDialogServiceProvider } from '../input-dialog-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  title = "Tasks I have completed";
  tasks: any = [];
  errorMessage: string;

  constructor(
    public toastCtrl: ToastController, public alertController: AlertController, public dataService: taskServiceProvider,
    public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing, public navCtrl: NavController
  ) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadTasks();
    });
    this.loadTasks();
  }
  ionViewDidLoad() {
    this.loadTasks();
  }
  loadTasks() {
    this.dataService.getTasks().subscribe(
      (tasks) => (this.tasks = tasks),
      (error) => (this.errorMessage = <any>error)
    );
  }

  async editTask(task, index) {
    console.log("Edit Task - ", task, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Task - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.showEditTaskPrompt({ task, index });
    }  
  
  addTask() {
    console.log("Adding Task");
    this.showAddTaskPrompt();
    }
  
  async showAddTaskPrompt() {
    const prompt = await this.alertController.create({
      message: "Please enter Task...",
      inputs: [
          {
            name: 'TaskName',
            placeholder: 'TaskName'
          },
          {
            name: 'date',
            placeholder: 'date'
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
              this.tasks.push(task);
            }
          }
        ]
      });
      prompt.present();
    }
  
  async showEditTaskPrompt({ task, index }: { task; index; }) {
    const prompt = await this.alertController.create({
        message: "Edit Task Name",
        inputs: [
          {
            name: 'TaskName',
            placeholder: 'TaskName',
            value: task.name
          },
          {
            name: 'date',
            placeholder: 'date',
            value: task.date
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
              this.tasks[index] = task;
            }
          }
        ]
      });
      prompt.present();
    } 
}