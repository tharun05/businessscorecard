import {Injectable} from '@angular/core';

@Injectable()
export class StrategyAnalysisService {
  constructor() {

  }

  public strategyAnalysis = {
    orgCode: null,
    orgName: null,
    type: null,
    year: null,
    description: null,
    version: null,
    details: [
      {
        title: 'Strengths',
        criterias: []
      },
      {
        title: 'Weaknesses',
        criterias: []
      },
      {
        title: 'Opportunities',
        criterias: []
      },
      {
        title: 'Threats',
        criterias: []
      }
    ],
    additionalFields: [
      {
        name: null,
        value: null
      },
      {
        name: null,
        value: null
      },
      {
        name: null,
        value: null
      },
      {
        name: null,
        value: null
      }
    ]
  };


  public pestalAnalysis = {
    orgCode: null,
    orgName: null,
    type: null,
    year: null,
    description: null,
    version: null,
    details: [
      {
        title: 'Political Analysis',
        criterias: []
      },
      {
        title: 'Economic Analysis',
        criterias: []
      },
      {
        title: 'Social Analysis',
        criterias: []
      },
      {
        title: 'Technological Analysis',
        criterias: []
      },
      {
        title: 'Environmental Analysis',
        criterias: []
      },
      {
        title: 'Legal Analysis',
        criterias: []
      }
    ],
    additionalFields: [
      {
        name: null,
        value: null
      },
      {
        name: null,
        value: null
      },
      {
        name: null,
        value: null
      },
      {
        name: null,
        value: null
      }
    ]
  };

}
