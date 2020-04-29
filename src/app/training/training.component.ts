import { Component, OnInit } from '@angular/core';
//import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from './training.service';
import * as fromTraining from './trainig.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  //ongoingTraining = false;
  //exerciseSubscription: Subscription;
  ongoingTraining$: Observable<boolean>

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.TrainingState>) { }

  ngOnInit(): void {
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
    //   exercise => {
    //     // exercise ? this.ongoingTraining = true : this.ongoingTraining = false;
    //     if (exercise) {
    //       this.ongoingTraining = true;
    //     } else {
    //       this.ongoingTraining = false;
    //     }
    //   }
    // );
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

  // ngOnDestroy() {
  //   if (this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }
}
