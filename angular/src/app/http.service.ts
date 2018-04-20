import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class HttpService {
  data: any;
  constructor(private _http: HttpClient) { }

  getAdd(x){
    console.log(x)
    return this._http.post('/new', {name: x.name, type: x.type, desc: x.description, skill1: x.skill1, skill2: x.skill2, skill3: x.skill3});
  }

  getPets(){
    return this._http.get('/getPets');
  }

  likePet(detail){
    return this._http.put('/likePet/'+detail._id, detail);
  }

  adoptPet(detail){
    return this._http.delete('/adoptPet/'+detail._id);
  }

  editPetData(detail){
    return this._http.put('/update/'+detail._id, detail);
  }
}
