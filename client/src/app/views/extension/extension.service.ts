import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { Extension } from './extension';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {AuthService} from '../login/auth.service';

@Injectable()

export class ExtensionService {

  constructor(private http: Http,private auth:AuthService) { }

//retrieve

getExtensions(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  
  var params = new HttpParams();
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('user',user);
  return this.http.get('/api/extensions',{headers:headers}).pipe(
  map(res => res.json()));
}
getLimit(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  
  var params = new HttpParams();
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('user',user);
  return this.http.get('/api/limit',{headers:headers}).pipe(
  map(res => res.json()));
}
getlextension(userid,limit)
{

  var params = new HttpParams();
  console.log(userid);
  var user = userid;
 var header = new Headers();
 header.append('userid',userid);
 header.append('limit',limit);
 console.log(userid,limit);
  return this.http.get('/api/lextension',{headers:header}).pipe(
  map(res => res.json()));
}
addExtension(newExtension)
{
  var headers = new Headers();
  headers.append('Content-Type','Application/Json');
  return this.http.post('/api/extension',newExtension,{headers:headers}).pipe(
  map(res => res.json()));
}

deleteExtension(id,extension)
{
  return this.http.delete('/api/extension/'+id+'/'+extension).pipe(map(res => res.json()));
}


}
