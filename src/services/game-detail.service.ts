import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Status } from '../model/enum/status.enum';
import { GameDetail } from '../model/game-detail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameDetailService {
  httpClient = inject(HttpClient);

  getAll(): Observable<GameDetail[]> {
    return this.httpClient.get<GameDetail[]>(Constants.getAll);
  }

  getByStatus(statuses: Status[]) {
    return this.httpClient.post<GameDetail[]>(Constants.getByStatus, statuses);
  }

  add(gameDetails: GameDetail[]) {
    return this.httpClient.post(Constants.add, gameDetails);
  }

  update(gameDetail: GameDetail) {
    return this.httpClient.post(Constants.update, gameDetail);
  }
}
