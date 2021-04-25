import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TFM } from 'src/tfm';
import { EditstatusComponent } from './editstatus/editstatus.component';
import { EditticketComponent } from './editticket/editticket.component';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.page.html',
  styleUrls: ['./ticketlist.page.scss'],
})
export class TicketlistPage implements OnInit {
  tickets = []
  users = []
  status = []

  constructor(public tfm: TFM, public modalController: ModalController) {
  }

  ngOnInit() {
    this.getTickets()
    this.getStatusTicket()
    this.tfm.User.roleid = 1 // hardcoded
    if (this.tfm.User.roleid === 1) {
      this.getUsersForAdministrator()
    }
  }


  async getTickets() {
    var _that = this
    var rid = 1 // hardcoded
    this.tfm._Post('/api/getTickets', { roleid: rid }, async function (_data) {
      _that.tickets = _data

    })
  }

  async openTicket() {
    const modal = await this.modalController.create({
      component: EditticketComponent,
      componentProps: {
        id: -1,
        cb: function () {
        }
      }
    });
    return await modal.present();
  }

  async editTicket(_obj) {
    const modal = await this.modalController.create({
      component: EditticketComponent,
      componentProps: {
        id: _obj.id, ticket: _obj,
        cb: function () {
        }
      }
    });
    return await modal.present();
  }

  async delete(obj) {
    // var _creatorid = req.body.creatorid
    // var _momentuserid = req.body._momentuserid
    this.tfm.User.roleid = 1 // hardcode
    if (this.tfm.User.roleid === 2) {
      var _dat = {
        ticketid: obj.id,
        creatorid: obj.creatorid,
        momentuserid: 9 // hardcode
      }
      debugger
      var _that = this
      this.tfm._Post('/api/softDeleteTicket', _dat, async function (_data) {
        console.log(_data, '_data')
      })
    } else {
      var _dat2 = {
        ticketid: obj.id,
        roleid: 1 // hardcode,
      }
      var _that = this
      this.tfm._Post('/api/hardDeleteTicket', _dat2, async function (_data) {
        console.log(_data, '_data')
      })

    }
  }


  async getUsersForAdministrator() {
    var _that = this
    this.tfm._Get('/api/getUsersForDeleteAndUpdate', {}, async function (_data) {
      console.log(_data, 'daj da vidam data')
      _that.users = _data

    })
  }


  async updateStatusUser(obj) {

    var _dat = {
      userid: obj.id,
      status: '0', // harcoded
      roleid: 1, // hardcoded
    }
    var _that = this
    this.tfm._Post('/api/ChangeStatusAdministrator', _dat, async function (_data) {
      console.log(_data, '_data')
    })
  }

  async deleteUser(_id) {
    var _dat = {
      userid: _id,
      roleid: 1 // hardcoded,
    }
    var _that = this
    this.tfm._Post('/api/deleteUser', _dat, async function (_data) {
      console.log(_data, '_data')
    })
  }


  async getStatusTicket() {
    var _that = this
    this.tfm._Get('/api/getStatusTicket', {}, async function (_data) {
      _that.status = _data
    })
  }

  async openStatus() {
    const modal = await this.modalController.create({
      component: EditstatusComponent,
      componentProps: {
        id: -1,
        cb: function () {
        }
      }
    });
    return await modal.present();
  }

  async editStatus(_obj) {
    const modal = await this.modalController.create({
      component: EditstatusComponent,
      componentProps: {
        id: _obj.id, status: _obj,
        cb: function () {
        }
      }
    });
    return await modal.present();
  }


  async deleteStatus(_id) {
    var _dat = {
      statusid: _id,
      roleid: 1, // hardcoded,
      statustochange: 2 // harcoded
    }
    var _that = this
    this.tfm._Post('/api/deleteStatusTicket', _dat, async function (_data) {
      console.log(_data, '_data')
    })
  }










}
