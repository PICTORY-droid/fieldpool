"use server";

import { redirect } from "next/navigation";

import { requireAdminAuth } from "../../../server/security/admin-auth";
import { createJobPost } from "../server/create-job-post";
import type { JobPostStatus } from "../types/job-post.types";

const JOB_POST_STATUSES: JobPostStatus[] = ["open", "paused", "closed"];

function getTextValue(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getOptionalNumberValue(formData: FormData, name: string) {
  const value = getTextValue(formData, name);

  if (!value) {
    return null;
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return null;
  }

  return numberValue;
}

function getOptionalDateValue(formData: FormData, name: string) {
  const value = getTextValue(formData, name);

  if (!value) {
    return null;
  }

  return value;
}

function getJobTypes(formData: FormData) {
  return formData
    .getAll("jobTypes")
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
}

function getJobPostStatus(formData: FormData): JobPostStatus {
  const status = getTextValue(formData, "status");

  if (JOB_POST_STATUSES.includes(status as JobPostStatus)) {
    return status as JobPostStatus;
  }

  return "open";
}

export async function createJobPostAction(formData: FormData) {
  await requireAdminAuth();

  const title = getTextValue(formData, "title");
  const siteName = getTextValue(formData, "siteName");
  const region = getTextValue(formData, "region");
  const address = getTextValue(formData, "address");
  const jobTypes = getJobTypes(formData);
  const neededCount = getOptionalNumberValue(formData, "neededCount");
  const pay = getOptionalNumberValue(formData, "pay");
  const startDate = getOptionalDateValue(formData, "startDate");
  const endDate = getOptionalDateValue(formData, "endDate");
  const careerYears = getOptionalNumberValue(formData, "careerYears");
  const requiresVehicle = formData.get("requiresVehicle") === "true";
  const providesLodging = formData.get("providesLodging") === "true";
  const status = getJobPostStatus(formData);
  const memo = getTextValue(formData, "memo");

  if (!title) {
    throw new Error("공고명을 입력하세요.");
  }

  await createJobPost({
    title,
    siteName,
    region,
    address,
    jobTypes,
    neededCount,
    pay,
    startDate,
    endDate,
    careerYears,
    requiresVehicle,
    providesLodging,
    status,
    sourceType: "manual",
    externalSource: null,
    externalId: null,
    memo,
  });

  redirect("/admin/jobs");
}