import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TFM } from 'src/tfm';
@Component({
  selector: 'app-editstatus',
  templateUrl: './editstatus.component.html',
  styleUrls: ['./editstatus.component.scss'],
})
export class EditstatusComponent implements OnInit {
  name = ''
  statusid = '-1'
  object: any

  constructor(public tfm: TFM, private navParams: NavParams, public modalCtrl: ModalController) {
    this.statusid = navParams.get('id')
    this.object = navParams.get('status')


    if (this.statusid != '-1') {
      this.name = this.object.name
    }
  }


  ngOnInit() { }

  closeMe() {
    this.modalCtrl.dismiss()
  }

  saveMe() {

    var _dat = {
      statusid: this.statusid,
      name: this.name,
      roleid: 1,
      ownerid: 8,//hardcoded
    }

    var _that = this
    this.tfm._Post('/api/insertStatus', _dat, function (_data) {
      console.log(_data, '_data')
      var _cb = _that.navParams.get('cb')
      if (_cb != null) {
        _cb()
      }
      _that.closeMe()
    })


  }


}
