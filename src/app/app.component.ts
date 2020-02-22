import { Component } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, NavController } from '@ionic/angular';
import { LocalStorageService } from './local-storage.service';
// import { Events } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
UserDetails:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public localstorage :LocalStorageService,
    public navctrl:NavController
      ) {
        this.UserDetails=this.localstorage.getItemLocally('userdetails');
        console.log('Hello'+JSON.stringify(this.UserDetails));

    this.initializeApp();
    if(this.UserDetails!=null){
      this.setDetails(this.UserDetails);
      console.log('Helo'+JSON.stringify(this.UserDetails));
    }
    // events.subscribe("user:created", (user, time) => {
    //   this.UserDetails = user;
    //   if (this.UserDetails !== undefined) {
    //     this.setDetails(this.UserDetails);
    //   }
    // });
    // event.subscribe("user:deleted", time => {
    //   console.log("User deleted by logging out at", time);
    // });
  }
  setDetails(UserDetails) {
    console.log(JSON.stringify(UserDetails));
    if(UserDetails!=null){
      this.navctrl.navigateRoot('/dash-board');
    }else{
      console.log('navigate to login');
      this.navctrl.navigateRoot('/login');
    }
}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
