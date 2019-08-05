import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { of } from 'rxjs';
import { People } from '../models/people';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {

  public peopleCollection: AngularFirestoreCollection<People>;
  public people: Observable<Array<People>>;
  public peopleDoc: AngularFirestoreDocument<People>;

  constructor(public afs: AngularFirestore) {
    // this.people = afs.collection('people').valueChanges();

  }
  getPeopleById(peopleId: string): Observable<People> {
    this.peopleDoc = this.afs.doc<People>(`peoples/${peopleId}`);
    return this.peopleDoc.snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as People;
        data.id = a.payload.id;
        return data;
      })
    );
  }

  getPeoples(): Observable<Array<People>> {
    return this.afs.collection<People>('peoples')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as People;
          data.id = a.payload.doc.id;
          return data;
        }))
      );
  }

  addPeople(people: People) {
    this.peopleCollection.add(people);
  }

  updtaePeople(people: People): Promise<void> {
    return this.afs
      .collection('peoples')
      .doc(people.id)
      .set(people);
  }

}
