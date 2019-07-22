import {Injectable} from '@angular/core';
import {AppService} from '../shared/app.service';
import {HttpService} from '../shared/http.service';
import {Props} from '../common/props';

@Injectable()
export class StrategyService {
  props: Props = Props;
  private organization_url = '/organization';
  private organizationTree_url = '/organization/tree';
  private organizationByCode_url = '/organization/code';
  private organizationById_url = '/organization';
  private organizationCodeAndName_url = '/organization/codeAndName';


  constructor(private http: HttpService, private appService: AppService) {
  }

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

}
