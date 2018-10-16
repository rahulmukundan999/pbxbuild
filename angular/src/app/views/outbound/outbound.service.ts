import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { Outbound } from './outbound';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()


export class OutboundService {

  constructor(private http: Http) { }
  getOutbounds()
{
  return this.http.get('/api/outbounds').pipe(
  map(res => res.json()));
}
addOutbound(newOutbound)
{
  var headers = new Headers();
  headers.append('Content-Type','Application/Json');
  return this.http.post('/api/outbound',newOutbound,{headers:headers}).pipe(
  map(res => res.json()));
}

deleteOutbound(id)
{
  return this.http.delete('/api/outbound/'+id).pipe(map(res => res.json()));
}


}
