import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AnalysisDocument = mongoose.HydratedDocument<Analysis>;

@Schema({ _id: false })
export class Emotion {
  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true })
  dominant_emotion: string;

  @Prop({ type: Map, of: Number, required: true })
  emotion: Map<string, number>;
}

export const EmotionSchema = SchemaFactory.createForClass(Emotion);

@Schema({ _id: false })
export class Emotion_Analysis {
  @Prop({ unique: true, required: true, type: Map, of: EmotionSchema })
  day: Map<string, Emotion>;

  @Prop({ unique: true, required: true, type: Map, of: EmotionSchema })
  month: Map<string, Emotion>;

  @Prop({ unique: true, required: true, type: Map, of: EmotionSchema })
  year: Map<string, Emotion>;
}

export const EmotionAnalysisSchema =
  SchemaFactory.createForClass(Emotion_Analysis);

@Schema()
export class Analysis {
  @Prop({ trim: true, unique: true, index: true })
  emailId: string;

  @Prop({ type: EmotionAnalysisSchema })
  emotion_analysis: Emotion_Analysis;
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
