import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../shared/baseurl';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private http: HttpClient) { }

  handleSuccess = (pos: any) => {
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
  
        this.http.get(baseURL + 'dishes')
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
