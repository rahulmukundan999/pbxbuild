import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { map } from 'rxjs/operators';
import {AuthService} from '../login/auth.service';




@Injectable()



export class TrunkService {

  constructor(private http: Http,private auth:AuthService) { }

//retrieve

getTrunks(userid)
{
  var headers = new Headers();
  headers.append('authorization','Bearer'+' '+this.auth.getTokenid());
  console.log(userid);
  var user = userid;
  console.log(typeof(user));
  headers.append('user',user);
  return this.http.get('/api/trunks',{headers:headers}).pipe (
  map(res => res.json()));
}
addTrunk(newTrunk)
{
  var headers = new Headers();
  headers.append('Content-Type','Application/Json');
  return this.http.post('/api/trunk',newTrunk,{headers:headers}).pipe(
  map(res => res.json()));
}

deleteTrunk(id)
{
  return this.http.delete('/api/trunk/'+id).pipe(map(res => res.json()));
}


}
