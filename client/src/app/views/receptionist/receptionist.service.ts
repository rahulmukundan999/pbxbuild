import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
//import { Wav } from './receptionist';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {AuthService} from '../login/auth.service';


@Injectable()


export class ReceptionistService {

  constructor(private http: Http,private auth:AuthService) { }
  fd = new FormData();
  addWav(file,id)
  {
    console.log('filefile',file);
    this.fd.append('id',id);
    this.fd.append('file', file, file.name);
    console.log(this.fd);
    return this.http.post('/api/addWav',this.fd).pipe(
    map(res => res.json()));
  }
  getWavs()
  {
    return this.http.get('/api/wavs').pipe(
      map(res => res.json()));


  }
  addReceptionist(newReceptionist)
  {
    

  var headers = new Headers();
  
  headers.append('Content-Type','Application/Json');
  return this.http.post('/api/receptionist',newReceptionist,{headers:headers}).pipe(
  map(res => res.json()));

  }
  getReceptionists()
  {
    return this.http.get('/api/receptionists').pipe(
    map(res => res.json()));
    

  }
deleteReceptionist(id)
{
  return this.http.delete('/api/receptionist/'+id).pipe(map(res => res.json()));
}
}