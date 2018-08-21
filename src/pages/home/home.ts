import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { baseURL } from '../../shared/baseurl';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http: Http) {

  }

  handleSuccess = (pos) => {
        console.log(pos);
        const position = {
            "latitude": pos.coords.latitude,
            "longitude": pos.coords.longitude,
            "accuracy": pos.coords.accuracy
        }
        const body = JSON.stringify(position);
        console.log(body);

        let header = new Headers();
        header.append('Content-Type', 'application/json');
  
        this.http
          .post(baseURL + '/nearest_station', body)
            .subscribe((data) => {
                  console.log(data);
                  alert('ok')
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
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
