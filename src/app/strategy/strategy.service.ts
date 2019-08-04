import {Injectable} from '@angular/core';
import {AppService} from '../shared/app.service';
import {HttpService} from '../shared/http.service';
import {HttpHeaders} from '@angular/common/http';
import {Props} from '../common/props';

@Injectable()
export class StrategyService {
  headers: HttpHeaders;
  props: Props = Props;
  private organization_url = '/organization';
  private organizationTree_url = '/organization/tree';
  private organizationByCode_url = '/organization/code';
  private organizationById_url = '/organization';
  private organizationCodeAndName_url = '/organization/codeAndName';
  private strategyAnalysis_url = '/strategy/analysis';
  private getStrategyAnalysis_url = '/strategy/analysis';
  private strategyProjection_url = '/strategicprojection';


  constructor(private http: HttpService, private appService: AppService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('rishi:bansal')
    })
  };

  saveOrganization(data: any) {
    return this.http.post(this.organization_url, data);
  }

  UpdateOrganization(data: any, id?: any) {
    return this.http.put(this.organization_url + '/' + id, data);
  }

  getOrganizationTree() {
    return this.http.get(this.organizationTree_url, null);
  }

  getCodeAndName() {
    return this.http.get(this.organizationCodeAndName_url, null);
  }

  getOrganizationByCode(data: any) {
    return this.http.get(this.organizationByCode_url, data);
  }

  getOrganizationById(id: any) {
    return this.http.getById(this.organizationById_url + '/' + id);
  }

  getSubUnitById(id) {
    return this.http.getById(this.organizationById_url + '/' + id);
  }

  saveSwotAnalysis(data: any) {
    return this.http.post(this.strategyAnalysis_url, data);
  }

  getStretegyAnalysis(code: any, year: any, version: any, type: any) {
    return this.http.get(this.getStrategyAnalysis_url + '/' + code + '/' + year + '/' + version + '/' + type, null);
  }

  saveStrategyProjection(data: any) {
    return this.http.post(this.strategyProjection_url, data);
  }

  UpdateStrategyProjection(data: any, id: any) {
    return this.http.put(this.strategyProjection_url + '/' + id, data);
  }

  getAllStrategyProjection() {
    return this.http.get(this.strategyProjection_url, null);
  }

  deleteStrategyProjection(id: any) {
    return this.http.delete(this.strategyProjection_url + '/' + id, null);
  }
}
