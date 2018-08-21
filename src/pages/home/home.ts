import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  handleSuccess = (pos) => {
        console.log(pos);
  };

  handleError = (err) => {
    err = JSON.stringify(err) || "error";
    console.log(err);
  }

  options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0
  };

  getChargingStation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError, this.options)
    }
  }

}
