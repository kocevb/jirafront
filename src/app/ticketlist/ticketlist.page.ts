import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TFM } from 'src/tfm';
import { EditticketComponent } from './editticket/editticket.component';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.page.html',
  styleUrls: ['./ticketlist.page.scss'],
})
export class TicketlistPage implements OnInit {
  tickets = []

  constructor(public tfm: TFM, public modalController: ModalController) { }

  ngOnInit() {
    this.getTickets()
  }


  async getTickets() {
    var _that = this
    this.tfm._Get('/api/getTickets', {}, async function (_data) {
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
    var _dat = {
      ticketid: obj.id,
      creatorid: obj.creatorid,
      momentuserid: 9
    }
    debugger
    var _that = this
    this.tfm._Post('/api/softDeleteTicket', _dat, async function (_data) {
      console.log(_data, '_data')

    })

  }




}
