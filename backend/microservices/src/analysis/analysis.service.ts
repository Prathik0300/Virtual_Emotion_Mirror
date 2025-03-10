import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Analysis,
  AnalysisDocument,
} from 'src/database/schemas/analysis.schema';
import { Exception } from 'src/error/error.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectModel(Analysis.name) private analysisModel: Model<AnalysisDocument>,
    private readonly utils: UtilsService,
  ) {}

  async getUserAnalysis(emailId: string): Promise<any> {
    const analysisDocument = await this.analysisModel
      .findOne({
        emailId: emailId,
      })
      .exec();

    if (!analysisDocument) {
      throw new Exception('User ID does not exist', HttpStatus.BAD_REQUEST);
    }

    return {
      data: analysisDocument,
      success: true,
      message: 'Successfully fetched Analysis',
    };
  }
  async saveAnalysis(analysisDto: any, emailId: string) {
    const {
      dominant_emotion,
      emotion: { angry = 0, happy = 0, neutral = 0, sad = 0 } = {},
    } = analysisDto[0];

    const { year, month, day } = this.utils.getDateInfo(new Date());

    const userAnalysis = await this.analysisModel.findOne({ emailId: emailId });

    let latestEmotionData = {
      date: new Date(),
      dominant_emotion,
      emotion: new Map<string, number>([
        ['happy', this.utils.roundUpAnalysisValue(happy)],
        ['neutral', this.utils.roundUpAnalysisValue(neutral)],
        ['sad', this.utils.roundUpAnalysisValue(sad)],
        ['angry', this.utils.roundUpAnalysisValue(angry)],
      ]),
    };

    if (userAnalysis) {
      let { emotion_analysis } = userAnalysis;

      if (emotion_analysis?.year.has(year)) {
        emotion_analysis.year.set(year, {
          ...latestEmotionData,
          emotion: new Map(
            this.utils.updateAnalysisValue(
              emotion_analysis.year.get(year).emotion,
              latestEmotionData.emotion,
            ),
          ),
        });
      } else {
        emotion_analysis.year.set(year, latestEmotionData);
      }

      if (emotion_analysis?.month.has(month)) {
        emotion_analysis.month.set(month, {
          ...latestEmotionData,
          emotion: new Map(
            this.utils.updateAnalysisValue(
              emotion_analysis.month.get(month).emotion,
              latestEmotionData.emotion,
            ),
          ),
        });
      } else {
        emotion_analysis.month.set(month, latestEmotionData);
      }

      if (emotion_analysis?.day.has(day)) {
        emotion_analysis.day.set(day, {
          ...latestEmotionData,
          emotion: new Map(
            this.utils.updateAnalysisValue(
              emotion_analysis.day.get(day).emotion,
              latestEmotionData.emotion,
            ),
          ),
        });
      } else {
        emotion_analysis.day.set(day, latestEmotionData);
      }

      userAnalysis.markModified('emotion_analysis');
      await userAnalysis.save();
      return userAnalysis;
    } else {
      const newAnalysis = new this.analysisModel({
        emailId: emailId,
        emotion_analysis: {
          year: new Map([[year, latestEmotionData]]),
          month: new Map([[month, latestEmotionData]]),
          day: new Map([[day, latestEmotionData]]),
        },
      });

      await newAnalysis.save();
      return newAnalysis.toObject();
    }
  }
}
