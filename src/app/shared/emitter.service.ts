import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class EmitterService {

  private loginCompleteSource = new Subject<string>();
  loginComplete$ = this.loginCompleteSource.asObservable();

  private productGroupSource = new Subject<any>();
  productGroup$ = this.productGroupSource.asObservable();

  private parentOrgCodeSource = new Subject<any>();
  parentOrgCodeSource$ = this.parentOrgCodeSource.asObservable();

  private orgUnitCodeSource = new Subject<any>();
  orgCodeSource$ = this.orgUnitCodeSource.asObservable();

  private emptyProjSource = new Subject<any>();
  emptyProjSource$ = this.emptyProjSource.asObservable();

  broadcastloginComplete(loginStatus: string) {
    this.loginCompleteSource.next(loginStatus);
  }

  broadcastProductGroup(productGrp: any) {
    this.productGroupSource.next(productGrp);
  }

  broadcastParentOrgUnitCode(ParentOrgCodes: any) {
    this.parentOrgCodeSource.next(ParentOrgCodes);
  }

  broadcastOrgUnitCode(OrgUnitCodes: any) {
    this.orgUnitCodeSource.next(OrgUnitCodes);
  }

  broadcastemptyProj(show: any) {
    this.emptyProjSource.next(show);
  }

}
