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
  Content = ''
  assign_userid: any
  statusid: any
  status = []
  ticketid = '-1'

  constructor(public tfm: TFM, private navParams: NavParams, public modalCtrl: ModalController) {
    this.ticketid = navParams.get('id')
    console.log(this.ticketid, 'ticketid')

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
    })
  }

  closeMe() {
    this.modalCtrl.dismiss()
  }



}
