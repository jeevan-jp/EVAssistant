import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public isNearestStation = false;

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    public platform: Platform,
    public toastCtrl: ToastController
  ) {}

  handleSuccess = (pos: any) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    console.log(pos);
    const position = {
      latitude: latitude,
      longitude: longitude,
      accuracy: pos.coords.accuracy
    };
    const body = JSON.stringify(position);
    console.log(body);

    let header = new Headers();
    header.append("Content-Type", "application/json");

    const LOCATION = `${latitude},${longitude}`;

    this.isNearestStation = true;

    // Don't forget to add the org.apache.cordova.device plugin!
    if (this.platform.is("ios")) {
      window.open(`comgooglemaps://?q=${LOCATION}`, "_system");
    }
    if (this.platform.is("android")) {
      const toast = this.toastCtrl.create({
        message: "Nearest charging station: SHASTRI PARK, G T Road",
        duration: 5000
      });
      toast.present();
      document.getElementById("openMap").style.display = "block";
    }
  };

  handleError = err => {
    err = JSON.stringify(err) || "error";
    console.log(err);
  };

  options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0
  };

  getChargingStation() {
    let permission;
    if (!localStorage.permission) {
      localStorage.setItem("permission", "true");
      permission = confirm("You will be prompted to give current location");
    } else {
      permission = localStorage.getItem("permission");
    }
    if (navigator.geolocation && permission) {
      navigator.geolocation.getCurrentPosition(
        this.handleSuccess,
        this.handleError,
        this.options
      );
    }
  }
}

// Android
// scheme = 'com.twitter.android';
// window.open('geo:?daddr=28.6562833,77.116675', "_system");
// let options: LaunchNavigatorOptions = {
//   start: 'London, ON',
//   app: LaunchNavigator.APP.GOOGLE_MAPS
// };

// this.launchNavigator.navigate('Toronto, ON', options)
//   .then(
//     success => console.log('Launched navigator'),
//     error => console.log('Error launching navigator', error)
//   );
// !Android

// iOS
// appAvailability.check(
//   scheme, // URI Scheme
//   function() {  // Success callback
//       window.open('twitter://user?screen_name=gajotres', '_system', 'location=no');
//       console.log('Twitter is available');
//   },
//   function() {  // Error callback
//       window.open('https://twitter.com/gajotres', '_system', 'location=no');
//       console.log('Twitter is not available');
//   }
// );
// !iOS
