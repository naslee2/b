import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  editPet: any;
  error: any;
  ngOnInit() {
    this.editPet = {name: "", desc: "", type: "", skill1: "", skill2: "", skill3: ""}
    this.editPet = this._httpService.data;
    console.log(this.editPet)
  }

  editPetData(){
    console.log(this.editPet);
    let edit = this._httpService.editPetData(this.editPet)
    edit.subscribe(data => {
      if(data['message'] == 'Error'){
        this.error = "Text must be 3 characters or longer!"
      }
      else{
        this._router.navigate(['/details/'+this.editPet._id]);
      }
    })
  }
}
