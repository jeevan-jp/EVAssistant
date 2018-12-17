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
  public timer;
  gaugeType = "arch";
  gaugeValue = 28.3;
  gaugeLabel = "Speed";
  gaugeAppendText = "km/hr";
  thresholdConfig = {
    "0": { color: "green" },
    "100": { color: "orange" },
    "170": { color: "red" }
  };

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    public platform: Platform,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
    this.startCar();
  }

  ionViewWillLeave() {
    this.stopTimer();
  }

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

  stopTimer = () => {
    clearInterval(this.timer);
  };

  startCar = () => {
    const InitialTime = 100;
    let time = InitialTime;

    let speed = 0;
    let x = 1;
    let toggler = 7;

    const startTimer = () => {
      let interval = 50;
      this.timer = setInterval(() => {
        if (time <= 0) {
          this.stopTimer();
        }
        if (time > InitialTime - 7.5) {
          x = 1;
        } else if (time > InitialTime - 10) {
          x = 2;
        } else if (time < 10) {
          x = 3;
        } else if (time < 5) {
          x = 4;
        } else {
          x = 5;
        }

        switch (x) {
          case 1:
            speed = exponential_increase(speed);
            console.log("Speed INCRESING RAPIDLY: ", speed);
            break;
          case 2:
            speed = increase_normal(speed);
            console.log("Speed INCRESING SLOWLY: ", speed);
            break;
          case 5:
            speed = neutral_speed(speed);
            console.log("Speed NEUTRAL: ", speed);
            break;
          case 3:
            speed = decrease_normal(speed);
            console.log("Speed DECREASING SLOWLY: ", speed);
            break;
          case 4:
            speed = exponential_decrease(speed);
            console.log("Speed DECREASING RAPIDLY: ", speed);
            break;
        }
        this.gaugeValue = speed;
        if (speed < 0) {
          this.gaugeValue = 0;
          this.stopTimer();
        }
        time = time - 0.08;
      }, interval);
    };

    const exponential_increase = speed => {
      return speed + 2;
    };

    const increase_normal = speed => {
      return speed + 1;
    };

    const neutral_speed = speed => {
      toggler = toggler == 7 ? -7 : 7;
      return speed + toggler;
    };

    const decrease_normal = speed => {
      return speed - 3;
    };

    const exponential_decrease = speed => {
      return speed - 10;
    };
    startTimer();
  };
}
