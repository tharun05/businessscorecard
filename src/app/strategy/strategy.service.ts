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
  private strategyProjection_url = '/strategicprojection';
  private valueGap_url = '/valuegap';
  private valueGapCloser_url = '/valuegapcloser';
  private productGroup_url = '/productgroup';

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
    return this.http.get(this.strategyAnalysis_url + '/' + code + '/' + year + '/' + version + '/' + type, null);
  }

  UpdateSwotAnalysis(data: any, id: any) {
    return this.http.put(this.strategyAnalysis_url + '/' + id, data);
  }

  getRevenueAmount(code: any, productgrp: any, year: any, version: any) {
    return this.http.get(this.strategyProjection_url + '/' + code + '/' + productgrp + '/' + year + '/' + version, null);
  }

  getRevenueGap(code: any, productgrp: any, year: any, version: any) {
    return this.http.get(this.valueGap_url + '/' + code + '/' + productgrp + '/' + year + '/' + version, null);
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

  getValueGap() {
    return this.http.get(this.valueGap_url, null);
  }

  saveValueGap(data: any) {
    return this.http.post(this.valueGap_url, data);
  }

  deleteValueGap(id: any) {
    return this.http.delete(this.valueGap_url + '/' + id, null);
  }

  updateValueGap(data: any, id: any) {
    return this.http.put(this.valueGap_url + '/' + id, data);
  }

  getValueGapCloser() {
    return this.http.get(this.valueGapCloser_url, null);
  }

  saveValueGapCloser(data: any) {
    return this.http.post(this.valueGapCloser_url, data);
  }

  deleteValueGapCloser(id: any) {
    return this.http.delete(this.valueGapCloser_url + '/' + id, null);
  }

  getAllProductGroup() {
    return this.http.get(this.productGroup_url, null);
  }

  updateProductGroup(data: any, id: any) {
    return this.http.put(this.productGroup_url + '/' + id, data);
  }

  saveProductGroup(data: any) {
    return this.http.post(this.productGroup_url, data);
  }
}
