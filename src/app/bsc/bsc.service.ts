import {Injectable} from '@angular/core';
import {AppService} from '../shared/app.service';
import {HttpService} from '../shared/http.service';
import {HttpHeaders} from '@angular/common/http';
import {Props} from '../common/props';

@Injectable()
export class BscService {
  headers: HttpHeaders;
  props: Props = Props;
  projType;

  private balanceScoreCard_url = '/scorecard';
  private perspective_url = '/scorecard/perspective';
  private theme_url = '/scorecard/theme';
  private subTheme_url = '/scorecard';

  constructor(private http: HttpService, private appService: AppService) {
  }

  saveBalanceScoreCard(data: any) {
    return this.http.post(this.balanceScoreCard_url, data);
  }

  saveScoreCardTheme(data: any) {
    return this.http.post(this.theme_url, data);
  }

  UpdateBalanceScoreCard(data: any, id?: any) {
    return this.http.put(this.balanceScoreCard_url + '/' + id, data);
  }

  updateTheme(data: any, id: any) {
    return this.http.put(this.theme_url + '/' + id, data);
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

  getThemeByCode(code: any) {
    return this.http.get(this.subTheme_url + '/' + code + '/theme', null);
  }

  deletePerspective(id: any) {
    return this.http.delete(this.perspective_url + '/' + id, null);
  }

  deleteTheme(id: any) {
    return this.http.delete(this.theme_url + '/' + id, null);
  }

  UpdatePerspective(data?: any, id?: any) {
    return this.http.put(this.balanceScoreCard_url + '/' + id, data);
  }

  savePerspective(data: any) {
    return this.http.post(this.perspective_url, data);
  }

  setProjType(type: any) {
    return this.projType = type;
  }

  getProjType() {
    return this.projType;
  }

}
