import type {
  ConstructionJobApiListHeader,
  ConstructionJobApiListItem,
  ConstructionJobApiListResponse,
  ExternalConstructionJobListItem,
  ExternalConstructionJobListResult,
} from "../types/construction-job-api.types";

const CONSTRUCTION_JOB_LIST_API_URL =
  "http://www.cid.or.kr/job/openApi/service/getJobOpenInfoList.do";

const DEFAULT_PAGE_NO = 1;
const DEFAULT_NUM_OF_ROWS = 10;

type GetConstructionJobListParams = {
  pageNo?: number;
  numOfRows?: number;
  rcritJssfc?: string;
  area?: string;
  wageSe?: string | number;
  wageAmountFrom?: number;
  wageAmountTo?: number;
  acdmcr?: string | number;
  career?: string;
  careerYear?: number;
  careerMonth?: number;
  lhCntrwkAt?: "Y" | "N";
  periodFrom?: string;
  periodTo?: string;
};

export async function getConstructionJobList(
  params: GetConstructionJobListParams = {},
): Promise<ExternalConstructionJobListResult> {
  const serviceKey = process.env.CONSTRUCTION_WORKER_JOBS_API_KEY;

  if (!serviceKey) {
    throw new Error("CONSTRUCTION_WORKER_JOBS_API_KEY is not configured.");
  }

  const url = new URL(CONSTRUCTION_JOB_LIST_API_URL);

  appendSearchParam(url, "ServiceKey", serviceKey);
  appendSearchParam(url, "type", "json");
  appendSearchParam(url, "pageNo", params.pageNo ?? DEFAULT_PAGE_NO);
  appendSearchParam(url, "numOfRows", params.numOfRows ?? DEFAULT_NUM_OF_ROWS);
  appendSearchParam(url, "rcritJssfc", params.rcritJssfc);
  appendSearchParam(url, "area", params.area);
  appendSearchParam(url, "wageSe", params.wageSe);
  appendSearchParam(url, "wageAmountFrom", params.wageAmountFrom);
  appendSearchParam(url, "wageAmountTo", params.wageAmountTo);
  appendSearchParam(url, "acdmcr", params.acdmcr);
  appendSearchParam(url, "career", params.career);
  appendSearchParam(url, "careerYear", params.careerYear);
  appendSearchParam(url, "careerMonth", params.careerMonth);
  appendSearchParam(url, "lhCntrwkAt", params.lhCntrwkAt);
  appendSearchParam(url, "periodFrom", params.periodFrom);
  appendSearchParam(url, "periodTo", params.periodTo);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch construction job list. status=${response.status}`,
    );
  }

  const data = (await response.json()) as ConstructionJobApiListResponse;

  return normalizeConstructionJobListResponse(data);
}

function appendSearchParam(
  url: URL,
  key: string,
  value: string | number | null | undefined,
) {
  if (value === null || value === undefined || value === "") {
    return;
  }

  url.searchParams.set(key, String(value));
}

function normalizeConstructionJobListResponse(
  data: ConstructionJobApiListResponse,
): ExternalConstructionJobListResult {
  const body = data.response ?? data;
  const header = body.header;
  const rawItems = body.items?.item;
  const items = normalizeItems(rawItems)
    .map(mapConstructionJobListItem)
    .filter(isExternalConstructionJobListItem);

  return {
    totalCount: getHeaderNumber(header, ["totalCount", "totalCnt", "totalCount:"]),
    pageNo: getHeaderNumber(header, ["pageNo", "pageNo:"]),
    numOfRows: getHeaderNumber(header, ["numOfRows", "numOfRows:"]),
    items,
  };
}

function normalizeItems(
  item: ConstructionJobApiListItem | ConstructionJobApiListItem[] | undefined,
) {
  if (!item) {
    return [];
  }

  return Array.isArray(item) ? item : [item];
}

function mapConstructionJobListItem(
  item: ConstructionJobApiListItem,
): ExternalConstructionJobListItem | null {
  const externalId = toText(item.cmpnyJoSeq);

  if (!externalId) {
    return null;
  }

  return {
    externalId,
    companyName: toText(item.cmpnyNm),
    title: toText(item.empmnSj),
    jobCode: toText(item.rcritJssfc),
    wageType: toText(item.wageSe),
    wageAmount: toNumberOrNull(item.wageAmount),
    careerType: toText(item.career),
    careerYear: toNumberOrNull(item.careerYear),
    careerMonth: toNumberOrNull(item.careerMonth),
    region: toText(item.workArea),
    address1: toText(item.workAreaAdres1),
    address2: toText(item.workAreaAdres2),
    registeredDate: toText(item.rgsde),
    deadlineDate: toNullableText(item.rceptEndde),
    isLhProject: toText(item.lhCntrwkAt) === "Y",
    raw: item,
  };
}

function isExternalConstructionJobListItem(
  item: ExternalConstructionJobListItem | null,
): item is ExternalConstructionJobListItem {
  return item !== null;
}

function getHeaderNumber(
  header: ConstructionJobApiListHeader | undefined,
  keys: string[],
) {
  const record = header as Record<string, unknown> | undefined;

  if (!record) {
    return 0;
  }

  for (const key of keys) {
    const value = toNumberOrNull(record[key]);

    if (value !== null) {
      return value;
    }
  }

  return 0;
}

function toText(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function toNullableText(value: unknown) {
  const text = toText(value);

  if (!text || text.toLowerCase() === "null") {
    return null;
  }

  return text;
}

function toNumberOrNull(value: unknown) {
  const text = toText(value).replaceAll(",", "");

  if (!text) {
    return null;
  }

  const numberValue = Number(text);

  return Number.isFinite(numberValue) ? numberValue : null;
}