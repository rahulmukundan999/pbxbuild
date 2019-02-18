import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { Ring } from './ring';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {AuthService} from '../login/auth.service';



@Injectable()



export class RingService {

  constructor(private http: Http, private auth:AuthService) { }
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
  addRing(newRing)
  {
    var headers = new Headers();
    headers.append('Content-Type','Application/Json');
    return this.http.post('/api/ring',newRing,{headers:headers}).pipe(
    map(res => res.json()));
  }
  
  deleteRing(id)
  {
    return this.http.delete('/api/ring/'+id).pipe(map(res => res.json()));
  }
  
  
  }
  