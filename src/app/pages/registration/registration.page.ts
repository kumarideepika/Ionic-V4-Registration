import { Component, OnInit } from '@angular/core';
import{GenericUtility,LocalStorageService} from '../../local-storage.service'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  Userdata={name:null,mobile_no:null,email:null,passwrd:null};
  validate={Vname:false,Vmobile:false};
  encPassword: string;
  constructor(public alrt:AlertController, 
    public getUti:GenericUtility,
    public router :Router,
    public localstorage:LocalStorageService) { }

  ngOnInit() {
  }
  dynamicValidate(data,type){
    switch(type){
      case 'name':
        let num=this.getUti.hasNumber(data);
      let spchr=this.getUti.IsSpecialCharacter(data);
      console.log(JSON.stringify(num));
      if(num==true){
        this.validate.Vname=true;
      }else if(spchr==true){
        this.validate.Vname=true;
      }else if(data==''){
        this.validate.Vname=false;
      }else{
        this.validate.Vname=false;
      }break;
      case 'contact':
        let chr=this.getUti.IsNumeric(data);
        console.log('chr::'+JSON.stringify(chr));
        if(chr==false){
          this.validate.Vmobile=true;
        }else if(data==''){
          this.validate.Vmobile=false;
        }else{
          this.validate.Vmobile=false; 
        }  
      break;
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
  ValidationReg(userdetails){
    // let encrypted = CryptoJS.AES.encrypt(userdetails.password.trim()).toString();  

    if(userdetails.name==null || userdetails.name==''){
      this.presentAlert("Empty Name", "Please provide a Name", "Close");    
  } else if (this.getUti.IsAlphanumericSpace(userdetails.name) == false ) {
    this.presentAlert("Incorrect Name", "Only Alphabetic character are allowed", "Close");
  }else if(this.validate.Vname==true){
      this.presentAlert("Incorrect Name", "Only Alphabetic character are allowed", "Close");
  }else if(userdetails.mobile_no==''){
    this.presentAlert("Empty Mobile number", "Please provide mobile number", "Close");    
  }else if(userdetails.email==''){
    this.presentAlert("Empty Email address", "Please provide a valid email address", "Close");    
  }
  else if(userdetails.password==null || userdetails.password==''){
    this.presentAlert("Empty password", "Please provide a valid password", "Close");    
  }else if (this.getUti.IsNumeric(userdetails.mobile_no) == false) {
    this.presentAlert("Invalid Mobile Number", "Only Numeric character  are allowed with 10 digits only", "Close");
  } else if (userdetails.mobile_no > 9999999999 || userdetails.mobile_no < 1111111111) {
    this.presentAlert("Number Incorrect", "Invalid Mobile Number provided", "Okay");
  }else if(userdetails.email!=''){
    let x = userdetails.email;
    let atpos = x.indexOf("@");
    let dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      this.presentAlert("Email Error", "Not a valid e-mail address", "Close");
    }else if(this.validate.Vname!=false || this.validate.Vmobile!=false){
      this.presentAlert("Incorrect data entered", "Pleasecheck the details", "Okay");
    }else{
      this.setDatatoLocalstorage(userdetails);
    }
  }
  
}
setDatatoLocalstorage(userdetails){

 
 let obj={
   name:userdetails.name,
   email:userdetails.email,
   mobile:userdetails.mobile_no,
   password:userdetails.password
 }
  this.localstorage.setObject('userdetails', userdetails);
  this.presentAlert("Registration Done!", "You have successfully registered", "Okay");
  this.router.navigate(['/login']);
}
}
