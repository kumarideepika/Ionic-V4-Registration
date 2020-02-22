import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../local-storage.service';
// import { AlertController, NavController,Events } from '@ionic/angular';
import { AlertController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.page.html',
  styleUrls: ['./dash-board.page.scss'],
})
export class DashBoardPage implements OnInit {
  userdetails:any;
  userdata={name:'',mobile:'',email:''}
  constructor(
    public localstorage:LocalStorageService,
    public alrt:AlertController,
    public navCtrl:NavController,
  ) {

    this.localstorage.getObject('userdetails').then(result => {
      if (result != null) {
        this.userdetails=result;
        this.userdata.name=this.userdetails.name;
        this.userdata.email=this.userdetails.email;
        this.userdata.mobile=this.userdetails.mobile_no;

   console.log(JSON.stringify(this.userdetails));

      }
      }).catch(e => {
      console.log('error: ', e);
      });

   }

  ngOnInit() {
  }
  async logout(){
    let alrtctrl=await this.alrt.create({
      message:'Are you sure want to logOut?',
      buttons:[{
        text:'No',
        handler:content=>{
        }
      },
        {text:"yes",
      handler:content=>{
        console.log('User deleted!');
        this.localstorage.removeItemLocally('userdetails');
        this.navCtrl.navigateRoot('login');
      }}
      ]
    });
   alrtctrl.present();
  
  }
}
