import {Injectable} from '@angular/core';
import {AppService} from '../shared/app.service';
import {HttpService} from '../shared/http.service';
import {HttpHeaders} from '@angular/common/http';
import {Props} from '../common/props';

@Injectable()
export class BscService {
  headers: HttpHeaders;
  props: Props = Props;

  private balanceScoreCard_url = '/scorecard';
  private perspective_url = '/scorecard/perspective';

  constructor(private http: HttpService, private appService: AppService) {
  }

  saveBalanceScoreCard(data: any) {
    return this.http.post(this.balanceScoreCard_url, data);
  }

  UpdateBalanceScoreCard(data: any, id?: any) {
    return this.http.put(this.balanceScoreCard_url + '/' + id, data);
  }

  getBalanceScoreCard() {
    return this.http.get(this.balanceScoreCard_url, null);
  }

  deleteBalanceScoreCard(id: any) {
    return this.http.delete(this.balanceScoreCard_url + '/' + id, null);
  }

  getPerspective() {
    return this.http.get(this.perspective_url, null);
  }

  getPerspectivesByCode(code: any) {
    return this.http.get(this.balanceScoreCard_url + '/' + code + '/perspective', null);
  }


  deletePerspective(id: any) {
    return this.http.delete(this.perspective_url + '/' + id, null);
  }

  UpdatePerspective(data?: any, id?: any) {
    return this.http.put(this.balanceScoreCard_url + '/' + id, data);
  }

  savePerspective(data: any) {
    return this.http.post(this.perspective_url, data);
  }

}
