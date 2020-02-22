import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../local-storage.service';
import { AlertController } from '@ionic/angular';
import { NavController} from "@ionic/angular";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public showPass = false;
  public type = "password";
  logindetails={email:null,password:null};
  userdetails:any='';
  constructor(
    public localstorage:LocalStorageService,
    public alrt:AlertController,
    public navctrl :NavController,
    public router :Router
  ) {
   
    this.localstorage.getObject('userdetails').then(result => {
      if (result != null) {
        this.userdetails=result;
   console.log(JSON.stringify(this.userdetails));

      }
      }).catch(e => {
      console.log('error: ', e);
      });

   }
   LoginValidation(logindetails){
    if (logindetails.email == "" || logindetails.email == null) {
      this.presentAlert("Email id missing", "Please enter Email Id", "Okay");
    } else if (logindetails.password == "" || logindetails.password == null) {
      this.presentAlert(
        "Password missing",
        "Please enter password",
        "Okay"
      );
    }else{
      console.log(JSON.stringify(this.userdetails));
      if(this.logindetails.email==this.userdetails.email){
        if(this.logindetails.password==this.userdetails.password){
          this.router.navigate(['/dash-board'],{
            queryParams: {
              ProductString : '',
             },
            });
        }else{
          this.presentAlert("Incorrect password", "Please enter valid password", "Okay");
        }
        
      }else{
        this.presentAlert("Incorrect EmailID", "Please enter valid Email Id", "Okay");
      }
    } 
   }
  ngOnInit() {
  }
  ShowPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }
  async presentAlert(header, subHeader, button) {
    const alert = await this.alrt.create({
      header: header,
      subHeader: subHeader,
      buttons: [button]
    });
    await alert.present();
  }
}
