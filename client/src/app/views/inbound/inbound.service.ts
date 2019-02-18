import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { Inbound } from './inbound';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {AuthService} from '../login/auth.service';


@Injectable()

export class InboundService {

  constructor(private http: Http,private auth:AuthService) { }

//retrieve
getRings(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('user',user);
  return this.http.get('/api/rings',{headers:headers}).pipe(
  map(res => res.json()));
}
getInbounds(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('user',user);
  return this.http.get('/api/inbounds',{headers:headers}).pipe(
  map(res => res.json()));
}
getWav(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('userid',userid);
  return this.http.get('/api/wavs',{headers:headers}).pipe(
  map(res => res.json()));
}
getExtensions(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('user',user);
  return this.http.get('/api/extensions',{headers:headers}).pipe(
  map(res => res.json()));
}
addInbound(newInbound)
{
  var headers = new Headers();
  headers.append('Content-Type','Application/Json');
  return this.http.post('/api/inbound',newInbound,{headers:headers}).pipe(
  map(res => res.json()));
}

deleteInbound(id)
{
  return this.http.delete('/api/inbound/'+id).pipe(map(res => res.json()));
}


}
