import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Http, Headers,HttpModule} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: Http) { }

  addUser(user) {
  var headers = new Headers();
  headers.append('Content-Type','Application/Json');
  return this.http.post('/api/user',user,{headers:headers}).pipe(
  map(res => res.json()));

  }
  payment(user) {
    var headers = new Headers();
  headers.append('Content-Type','Application/Json');
    return this.http.post('/api/charge',{headers:headers}).pipe(
      map(res => res.json()));
  }
}
