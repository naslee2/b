import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  getPets: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.showPetsHome();
  }
  showPetsHome(){
    let x = this._httpService.getPets();
    x.subscribe(data => {
      console.log("woah", data);
      this.getPets = data['data'];
    })
  }

  petDetails(x){
    this._router.navigate(['/details/'+x['_id']]);
    this._httpService.data = x;
  }

  editPet(x){
    this._router.navigate(['/edit/'+x['_id']]);
    this._httpService.data = x;
  }
}
