import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public isNearestStation = false;

  constructor(public navCtrl: NavController, private http: HttpClient,
    public platform: Platform, public toastCtrl: ToastController) { }

  handleSuccess = (pos: any) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        console.log(pos);
        const position = {
            "latitude": latitude,
            "longitude": longitude,
            "accuracy": pos.coords.accuracy
        }
        const body = JSON.stringify(position);
        console.log(body);

        let header = new Headers();
        header.append('Content-Type', 'application/json');
  
        // let scheme;
        const LOCATION = `${latitude},${longitude}`;
        
        this.isNearestStation = true;
 
        // Don't forget to add the org.apache.cordova.device plugin!
        let platformName;
        if(this.platform.is('ios')) {
          platformName = 'iOS';
        }
        if(this.platform.is('android')) {
          platformName = 'Android';
        }
        if(platformName === 'iOS') {
            // scheme = 'twitter://';
            window.open(`comgooglemaps://?q=${LOCATION}`, "_system");
        }
        else if(platformName === 'Android') {
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
            const toast = this.toastCtrl.create({
              message: 'Nearest: Tagore Garden Extension',
              duration: 3000
            });
            toast.present();
            document.getElementById('openMap').style.display = 'block';
        }

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
      navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError, this.options);
    }
  }

}
