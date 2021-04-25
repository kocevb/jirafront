import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable()


export class TFM {

    User = {
        id: -1,
        firstname: '',
        lastname: '',
        status: '',
        email: '',
        roleid: 2,

    }

    userHASH: string = ''



    constructor(private http: HTTP, private httpWeb: HttpClient,) {
    }



    public _Post(_url: any, _data: any, _callback: any) {
        var _that = this
        this.httpWeb.post(_url, _data).subscribe(function (data: any) {
            // console.log(data)
            // var _data = JSON.parse(data._body)
            if (_callback != null) {
                _callback(data)
            }
        }, function (err) {
            if (err.status + '' == '500') {
                setTimeout(function () {
                    _that._Post(_url, _data, _callback)
                }, 1000)
            } else {
                _callback([])
            }

        });
    }

    public _Get(_url: any, _data: any, _callback: any) {
        var _that = this
        this.httpWeb.get(_url, _data).subscribe(function (data: any) {
            var _data = data
            if (_callback != null) {
                _callback(_data)
            }
        }, function (err) {
            // console.log(err)
        });

    }

    public checkUserHash(_callback) {
        //userHASH

        var _that = this
        var h = localStorage.getItem("tfmDatahash")
        if (h == null && h == undefined) { h = '' }

        if (h != "") {
            this.userHASH = h
        }
        if (this.userHASH == '') { this.userHASH = '-1' }
        this._Post('/api/checkuser', { D1: this.userHASH }, function (_data) {
            if (_data.E1 > 0) {
                _that._Post('/api/getuser', { D1: h }, function (_data) {
                    console.log(_data, '_data')

                    _that.User.id = _data[0].id
                    _that.User.firstname = _data[0].firstname
                    _that.User.lastname = _data[0].lastname
                    _that.User.status = _data[0].status
                    _that.User.email = _data[0].email
                    _that.User.roleid = _data[0].roleid
                    _callback()
                })
            } else {
                _callback()
            }
        })
    }

}

