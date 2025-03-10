import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  private weight_old = 0.9;
  private weight_new = 1 - this.weight_old;

  roundUpAnalysisValue = (num: number): number => {
    if (num >= 1) {
      return Math.ceil(num);
    }
    if (num > 0) {
      return Math.ceil(num * 1000000) / 1000000;
    }
    return 0;
  };

  getDateInfo = (date: Date) => {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return {
      year,
      month: `${month}/${year}`,
      day: `${day}/${month}/${year}`,
    };
  };

  weightedAverageAnalysisValue = (value1: number, value2: number) => {
    return value1 * this.weight_old + value2 * this.weight_new;
  };

  updateAnalysisValue = (existingEmotion: any, latestEmotion: any) => {
    const keys = Array.from(existingEmotion.keys());
    let updatedEmotion = new Map();

    keys.forEach((key) => {
      updatedEmotion.set(
        key,
        this.roundUpAnalysisValue(
          this.weightedAverageAnalysisValue(
            existingEmotion.get(key),
            latestEmotion.get(key),
          ),
        ),
      );
    });
    return updatedEmotion;
  };
}
