import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { Contact } from './contact';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {AuthService} from '../login/auth.service';

@Injectable()

export class ContactService {

  constructor(private http: Http,private auth:AuthService) { }

//retrieve

getContacts(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('user',user);
  return this.http.get('/api/contacts',{headers:headers}).pipe(
  map(res => res.json()));
}
addContact(newContact)
{
  var headers = new Headers();
  headers.append('Content-Type','Application/Json');
  return this.http.post('/api/contact',newContact,{headers:headers}).pipe(
  map(res => res.json()));
}

deleteContact(id)
{
  return this.http.delete('/api/contact/'+id).pipe(map(res => res.json()));
}


}
