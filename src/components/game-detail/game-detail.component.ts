import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Status } from '../../model/enum/status.enum';
import { Website } from '../../model/enum/website.enum';
import { GameDetail } from '../../model/game-detail';
import { GameDetailService } from '../../services/game-detail.service';

@Component({
  selector: 'app-game-detail',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  gameDetailService = inject(GameDetailService);
  changeDetectorRef = inject(ChangeDetectorRef);

  gameDetails = signal<GameDetail[]>([]);
  gameDetail = signal<GameDetail>({} as GameDetail);
  statuses = Object.values(Status);
  websites = Object.values(Website);
  displayedColumns = ["name", "status", "website", "action"];
  gameDetailForm: FormGroup;

  constructor() {
    this.gameDetailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl(Status.Added, Validators.required),
      website: new FormControl(null),
      creationDate: new FormControl(new Date, Validators.required),
      startDate: new FormControl(null),
      archiveDate: new FormControl(null),
      completionDate: new FormControl(null),
    });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.gameDetailService.getAll().subscribe((gameDetails: GameDetail[]) => {
      this.gameDetails.set(gameDetails);
      this.changeDetectorRef.detectChanges();
    });
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

  start(gameDetail: GameDetail) {
    gameDetail.status = Status.Started;
    gameDetail.startDate = new Date().toISOString();
    this.gameDetailService.update(gameDetail).subscribe(() => {
      this.getAll();
    });
  }

  archive(gameDetail: GameDetail) {
    gameDetail.status = Status.Archived;
    gameDetail.archiveDate = new Date().toISOString();
    this.gameDetailService.update(gameDetail).subscribe(() => {
      this.getAll();
    });
  }

  complete(gameDetail: GameDetail) {
    gameDetail.status = Status.Completed;
    gameDetail.completionDate = new Date().toISOString();
    this.gameDetailService.update(gameDetail).subscribe(() => {
      this.getAll();
    });
  }

  getRandom() {
    const pendingGames = this.gameDetails().filter(f => {
      return f.status === Status.Added || f.status === Status.Archived;
    });

    this.gameDetail.set(pendingGames[Math.floor(Math.random() * pendingGames.length)]);
  }
}
