export type ConstructionJobApiListHeader = {
  totalCount?: number | string;
  numOfRows?: number | string;
  pageNo?: number | string;
};

export type ConstructionJobApiListItem = {
  cmpnyJoSeq?: string;
  cmpnyNm?: string;
  empmnSj?: string;
  rcritJssfc?: string;
  wageSe?: number | string;
  wageAmount?: number | string;
  career?: string;
  careerYear?: number | string | null;
  careerMonth?: number | string | null;
  workArea?: string;
  workAreaAdres1?: string;
  workAreaAdres2?: string;
  rgsde?: string;
  rceptEndde?: string | null;
  lhCntrwkAt?: string;
};

export type ConstructionJobApiListResponse = {
  response?: {
    header?: ConstructionJobApiListHeader;
    items?: {
      item?: ConstructionJobApiListItem | ConstructionJobApiListItem[];
    };
  };
  header?: ConstructionJobApiListHeader;
  items?: {
    item?: ConstructionJobApiListItem | ConstructionJobApiListItem[];
  };
};

export type ExternalConstructionJobListItem = {
  externalId: string;
  companyName: string;
  title: string;
  jobCode: string;
  wageType: string;
  wageAmount: number | null;
  careerType: string;
  careerYear: number | null;
  careerMonth: number | null;
  region: string;
  address1: string;
  address2: string;
  registeredDate: string;
  deadlineDate: string | null;
  isLhProject: boolean;
  raw: ConstructionJobApiListItem;
};

export type ExternalConstructionJobListResult = {
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  items: ExternalConstructionJobListItem[];
};