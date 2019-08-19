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

}
