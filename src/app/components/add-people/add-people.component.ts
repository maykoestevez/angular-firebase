import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { People } from '../../models/people';
import { PeoplesService } from '../../services/peoples.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {

  public people: People = new People();

  constructor(
    private peoplesService: PeoplesService,
    private cd: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(({ id }) => {
      this.peoplesService.getPeopleById(id).subscribe(data => {
        this.people = data;
      });
    });
  }

  updatePeople() {
    this.peoplesService.updtaePeople(this.people).then(() => {
      this.router.navigate(['/peoples']);
    }).catch((reason) => alert(reason));
  }
}
