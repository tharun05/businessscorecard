import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EmitterService {

  private loginCompleteSource = new Subject<string>();
  loginComplete$ = this.loginCompleteSource.asObservable();

  broadcastloginComplete(loginStatus: string) {
    this.loginCompleteSource.next(loginStatus);
  }

}
