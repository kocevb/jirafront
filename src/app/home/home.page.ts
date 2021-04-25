import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TFM } from 'src/tfm';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  FName = ''
  LName = ''
  Email = ''
  DisabledEmail = false

  Password1 = ''

  showPass = false
  passType = "password"

  loginFlag = false

  constructor(public alertController: AlertController, public toastController: ToastController, public loadingController: LoadingController, public tfm: TFM, public router: Router) { }

  async msgbox(_msg) {
    const alert = await this.alertController.create({
      header: "Error",
      message: _msg,
      mode: 'ios',
      buttons: ["Ok"],
    });

    await alert.present();
  }
  async gotoNext() {


    var _dat = {
      firstname: this.FName,
      lastname: this.LName,
      password: this.Password1,
      email: this.Email,
    }

    var _that = this
    this.tfm._Post('/api/join', _dat, function (_data) {
      console.log(_data, '_data')

    })

  }

  ngOnInit() {
  }

  login() {
    this.loginFlag = true
  }
  create() {
    this.loginFlag = false
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Wrong credentials",
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async loginacc() {
    var _that = this
    var _un = this.Email
    var _pass = this.Password1
    const ldr = this.loadingController.create({
      cssClass: 'login-sec-check',
      message: 'Credentials security checking<br>Please wait...',
      spinner: 'lines'
    });
    (await ldr).present()
    _that.tfm._Post('/api/loginUser', { A1: _un, B1: _pass }, async function (_data) {
      (await ldr).dismiss()
      if (_data.msg == "ERROR") {
        _that.presentToast()
      } else {

        var _uid = _data.F1
        console.log(_data.F1, '_data.F1')
        localStorage.setItem("tfmDatahash", _uid)
        _that.tfm.checkUserHash(function () {
          setTimeout(function () {
            _that.openticket()
          }, 500)
        })
      }
    })
  }


  openticket() {
    this.router.navigate(['/ticketlist']);
  }
}
