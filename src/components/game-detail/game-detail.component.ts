import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDetail } from '../../model/game-detail';
import { GameDetailService } from '../../services/game-detail.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Website } from '../../model/enum/website.enum';
import { Status } from '../../model/enum/status.enum';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import moment from 'moment';

@Component({
  selector: 'app-game-detail',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
     MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  gameDetailService = inject(GameDetailService);
  gameDetails$?: Observable<GameDetail[]>;
  statuses = Object.values(Status);
  websites = Object.values(Website);

  gameDetailForm: FormGroup;

  constructor() {
    this.gameDetailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl(Status.Added.toString(), Validators.required),
      website: new FormControl(null),
      creationDate: new FormControl(new Date, Validators.required),
      startDate: new FormControl(null),
      archiveDate: new FormControl(null),
      completionDate: new FormControl(null),
    });
  }

  ngOnInit() {
    debugger;
    this.getAll();
  }

  getAll() {
    this.gameDetails$ = this.gameDetailService.getAll();
  }

  add() {
    if (this.gameDetailForm.valid) {
      const newGameDetail: GameDetail = this.gameDetailForm.value;
      this.gameDetailService.add([newGameDetail]).subscribe(() => {
        this.getAll();
        this.gameDetailForm.reset();
      });
    }
  }
}
