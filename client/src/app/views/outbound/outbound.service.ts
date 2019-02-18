import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { Outbound } from './outbound';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {AuthService} from '../login/auth.service';


@Injectable()


export class OutboundService {
  constructor(private http: Http,private auth:AuthService) { }
  getOutbounds(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('user',user);
  return this.http.get('/api/outbounds',{headers:headers}).pipe(
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
