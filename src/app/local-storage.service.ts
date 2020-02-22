import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, } from "@ionic/angular";
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(public localstorage: Storage,
    private alrtCtrl: AlertController) {

    
   }
   getItemLocally(name) {
    let item: any;
    let itemstringified: any;
    itemstringified = localStorage.getItem(name);
    if (
      itemstringified == "undefined" ||
      itemstringified == undefined ||
      itemstringified == null ||
      itemstringified == ""
    ) {
      item = null;
    } else {
      item = JSON.parse(localStorage.getItem(name));
    }
    return item;
  }
  setItemLocally(name, item) {
    localStorage.setItem(name, JSON.stringify(item));
  }
  removeItemLocally(name){
    console.log('LocalStorageProvider:removeItemLocally:Parameter : ' + name);
    localStorage.removeItem(name);
  }
 
//     async get(key: string): Promise<any> {
//       try {
//       const result = await this.localstorage.get(key);
//       console.log('storageGET: ' + key + ': ' + result);
//       if (result != null) {
//       return result;
//       }else{
//         alert('no')
//       }
      
//       // return null;
//       } catch (reason) {
      
//       console.log(reason);
//       return null;
//       }
// }
async setObject(key: string, object: Object) {

  try {
  
  const result = await this.localstorage.set(key, JSON.stringify(object));
  console.log('set Object in storage: ' + result);
  return true;
  } catch (reason) {
  console.log(reason);
  return false;
  }
  }
  
  // get a key/value object
  
  async getObject(key: string): Promise<any> {
  try {
  const result = await this.localstorage.get(key);
  if (result != null) {
  return JSON.parse(result);
  }
  return null;
  } catch (reason) {
  console.log(reason);
  return null;
  }
  }
}
@Injectable()
export class GenericUtility {
  constructor() { }
  public IsAlphanumericSpace(inputtxt) {
    console.log(inputtxt + "  " + typeof (inputtxt));
    var letterNumber = /^[a-z\d\-()_,.\s]+$/i;
    if (inputtxt.match(letterNumber)) {
      return true;
    }
    else {
      return false;
    }
  }
  public IsNumeric(number) {
    let num = /^[0-9]*$/;
    if (number.match(num)) {
      return true;
    }
    else {
      return false;
    }
  }
  public IsSpecialCharacter(inputtxt) {
    // var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (inputtxt.match(format)) {
      return true;
    } else {
      return false;
    }
  }
  public hasNumber(inputtxt) {
    console.log(inputtxt + "  " + typeof (inputtxt));
    let letterNumber = inputtxt.match(/\d+/g);
    if (inputtxt.match(letterNumber)) {
      return true;
    } else {
      return false;
    }
  }
}

