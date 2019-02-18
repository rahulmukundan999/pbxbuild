import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class PaymentService {


  constructor(private http: Http) {}

  stripecharge(data) {
    console.log(data);
    var headers = new Headers();
    var params = new HttpParams()
    var data1 = {
      token:data.id,
      id:data
    };
  headers.append('Content-Type','Application/Json');
  return this.http.post('/api/charge',data,{headers:headers}).pipe(
  map(res => res.json()));
  }
}
