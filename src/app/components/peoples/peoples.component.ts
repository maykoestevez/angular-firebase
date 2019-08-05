import { Component, OnInit, Input } from '@angular/core';
import { PeoplesService } from '../../services/peoples.service';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { People } from '../../models/people';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.css']
})
export class PeoplesComponent implements OnInit {

  public searchText: string;
  public peoples: Array<People>;

  constructor(private peopleService: PeoplesService, private homeService: HomeService) { }

  ngOnInit() {
    this.getData();
    this.homeService.setActiveNav(true);
  }

  private getData() {
    this.peopleService.getPeoples().subscribe(data => {
      this.peoples = data;
    });
  }
  delete(peopleId: string) {
    this.peopleService.deletePeople(peopleId).then(() => {
      this.getData();
    }).catch((reason) =>  alert(reason));
  }

}
