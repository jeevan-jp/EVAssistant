import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { AboutPage } from "../pages/about/about";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { NearestStationProvider } from "../providers/nearest-station/nearest-station";
import { ProcessHttpmsgProvider } from "../providers/process-httpmsg/process-httpmsg";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { NgxGaugeModule } from "ngx-gauge";

@NgModule({
  declarations: [MyApp, HomePage, AboutPage, LoginPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgxGaugeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, AboutPage, LoginPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NearestStationProvider,
    ProcessHttpmsgProvider
  ]
})
export class AppModule {}
