import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EmitterService {

  private loginCompleteSource = new Subject<string>();
  loginComplete$ = this.loginCompleteSource.asObservable();

  private productGroupSource = new Subject<any>();
  productGroup$ = this.productGroupSource.asObservable();

  broadcastloginComplete(loginStatus: string) {
    this.loginCompleteSource.next(loginStatus);
  }

  broadcastProductGroup(productGrp: any) {
    this.productGroupSource.next(productGrp);
  }

}
