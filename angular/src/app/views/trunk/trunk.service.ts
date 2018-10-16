import { Injectable } from '@angular/core';
import { Http, Headers,HttpModule} from '@angular/http';
import { map } from 'rxjs/operators';



@Injectable()



export class TrunkService {

  constructor(private http: Http) { }

//retrieve

getTrunks()
{
  return this.http.get('/api/trunks').pipe (
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
