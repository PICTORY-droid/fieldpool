import type { JobPost } from "../types/job-post.types";
import { WORKER_STATUS } from "../../workers/constants/worker-status";
import type { Worker } from "../../workers/types/worker.types";

const MATCHABLE_WORKER_STATUSES = [
  WORKER_STATUS.NEW,
  WORKER_STATUS.CONTACT_NEEDED,
  WORKER_STATUS.CONSULTED,
  WORKER_STATUS.READY_TO_REFER,
];

export type WorkerJobMatch = {
  worker: Worker;
  score: number;
  isMatch: boolean;
  matchedReasons: string[];
  unmatchedReasons: string[];
};

function hasRegionMatch(jobPost: JobPost, worker: Worker) {
  if (!jobPost.region) {
    return true;
  }

  return (
    worker.mainRegion === jobPost.region ||
    worker.availableRegions.some((region) => region === jobPost.region)
  );
}

function hasJobTypeMatch(jobPost: JobPost, worker: Worker) {
  if (jobPost.jobTypes.length === 0) {
    return true;
  }

  return worker.jobTypes.some((jobType) => jobPost.jobTypes.includes(jobType));
}

function hasCareerMatch(jobPost: JobPost, worker: Worker) {
  if (jobPost.careerYears === null) {
    return true;
  }

  if (worker.careerYears === null) {
    return false;
  }

  return worker.careerYears >= jobPost.careerYears;
}

function hasVehicleMatch(jobPost: JobPost, worker: Worker) {
  if (!jobPost.requiresVehicle) {
    return true;
  }

  return worker.hasVehicle;
}

function hasLodgingMatch(jobPost: JobPost, worker: Worker) {
  if (!jobPost.providesLodging) {
    return true;
  }

  return worker.canLodging;
}

function isMatchableWorkerStatus(worker: Worker) {
  return MATCHABLE_WORKER_STATUSES.some((status) => status === worker.status);
}

export function matchWorkersToJob(
  jobPost: JobPost,
  workers: Worker[],
): WorkerJobMatch[] {
  return workers
    .map((worker) => {
      const matchedReasons: string[] = [];
      const unmatchedReasons: string[] = [];
      let score = 0;

      const regionMatched = hasRegionMatch(jobPost, worker);
      const jobTypeMatched = hasJobTypeMatch(jobPost, worker);
      const careerMatched = hasCareerMatch(jobPost, worker);
      const vehicleMatched = hasVehicleMatch(jobPost, worker);
      const lodgingMatched = hasLodgingMatch(jobPost, worker);
      const statusMatched = isMatchableWorkerStatus(worker);

      if (statusMatched) {
        matchedReasons.push("소개 가능한 상태");
        score += 20;
      } else {
        unmatchedReasons.push("현재 소개 대상 상태가 아님");
      }

      if (regionMatched) {
        matchedReasons.push("지역 조건 일치");
        score += 30;
      } else {
        unmatchedReasons.push("지역 조건 불일치");
      }

      if (jobTypeMatched) {
        matchedReasons.push("공종 조건 일치");
        score += 30;
      } else {
        unmatchedReasons.push("공종 조건 불일치");
      }

      if (careerMatched) {
        matchedReasons.push("경력 조건 충족");
        score += 20;
      } else {
        unmatchedReasons.push("경력 조건 미달");
      }

      if (vehicleMatched) {
        matchedReasons.push("차량 조건 충족");
        score += 10;
      } else {
        unmatchedReasons.push("차량 조건 미충족");
      }

      if (lodgingMatched) {
        matchedReasons.push("숙소 조건 충족");
        score += 10;
      } else {
        unmatchedReasons.push("숙소 조건 미충족");
      }

      const isMatch =
        statusMatched &&
        regionMatched &&
        jobTypeMatched &&
        careerMatched &&
        vehicleMatched &&
        lodgingMatched;

      return {
        worker,
        score,
        isMatch,
        matchedReasons,
        unmatchedReasons,
      };
    })
    .sort((firstMatch, secondMatch) => {
      if (firstMatch.isMatch !== secondMatch.isMatch) {
        return firstMatch.isMatch ? -1 : 1;
      }

      return secondMatch.score - firstMatch.score;
    });
}