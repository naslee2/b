import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  detailData: any;
  error: any;
  ngOnInit() {
    this.detailData = this._httpService.data;
    console.log("detail",this.detailData)
  }

  likePet(x){
    let obs = this._httpService.likePet(x);
    obs.subscribe(data =>{
      if(data['message'] == 'Error'){
        this.error = "Invalid Name"
        console.log("error")
      }
      else{
        console.log("successful like")
        this._router.navigate(['/home']);
      }
    })
  }

  adoptPet(x){
    console.log(x)
    let obs = this._httpService.adoptPet(x);
    obs.subscribe(data =>{
      if(data['message'] == 'Error'){
        this.error = "Invalid Name"
        console.log("error")
      }
      else{
        console.log("successful adopt")
        this._router.navigate(['/home']);
      }
    })
  }


}
