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




    public isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    public rndCode() {
        return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    }
}

