import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TFM } from 'src/tfm';

@Component({
  selector: 'app-editticket',
  templateUrl: './editticket.component.html',
  styleUrls: ['./editticket.component.scss'],
})
export class EditticketComponent implements OnInit {

  users = []
  title = ''
  content = ''
  assign_userid: any
  statusid: any
  status = []
  ticketid = '-1'
  object: any
  modeldisabled = false

  constructor(public tfm: TFM, private navParams: NavParams, public modalCtrl: ModalController) {
    this.ticketid = navParams.get('id')
    this.object = navParams.get('ticket')

    if (this.ticketid != '-1') {
      this.title = this.object.title
      this.content = this.object.content
      this.assign_userid = this.object.assignid
      this.statusid = this.object.statusid
      // this.modeldisabled = true

    }

  }

  ngOnInit() {
    this.getUsers()
    this.getStatusTicket()
  }


  async getUsers() {
    var _that = this
    this.tfm._Get('/api/getUsers2', {}, async function (_data) {
      _that.users = _data

    })
  }


  async getStatusTicket() {
    var _that = this
    this.tfm._Get('/api/getStatusTicket', {}, async function (_data) {
      _that.status = _data
      if (_data.length > 0 && _that.ticketid == '-1') {
        _that.statusid = _data[0].id
      }
    })
  }

  closeMe() {
    this.modalCtrl.dismiss()
  }

  saveMe() {

    var _dat = {
      ticketid: this.ticketid,
      title: this.title,
      content: this.content,
      assign_userid: this.assign_userid,
      statusid: this.statusid,
      creatorid: 8 // hardcode

    }
    var _that = this
    this.tfm._Post('/api/insertTicket', _dat, function (_data) {
      console.log(_data, '_data')
      var _cb = _that.navParams.get('cb')
      if (_cb != null) {
        _cb()
      }
      _that.closeMe()
    })


  }



}
