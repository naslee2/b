import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  error: any;
  newPet: any;

  ngOnInit() {
    this.newPet = {name: "", description: "", type: "", skill1: "", skill2: "", skill3: ""}
  }

  petAdd(){
    console.log(this.newPet.name, this.newPet.description, this.newPet.skill1, this.newPet.skill2, this.newPet.skill3, this.newPet.type)
    let add = this._httpService.getAdd(this.newPet)
    add.subscribe(data => {
      if(data['message'] == 'Error'){
        this.error = "Must be 3 character or longer!"
      }
      else{
        this._router.navigate(['/home']);
      }
    })

    }
  }
