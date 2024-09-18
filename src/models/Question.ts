import mongoose, { Schema, Document, Types } from 'mongoose';

interface IQuestion extends Document<Types.ObjectId> {
    text: string;
    options: string[];
    keywords: string[];
    correctAnswerIndex: number;
    author: Types.ObjectId; 
}

const QuestionSchema: Schema = new Schema({
    text: { type: String, required: true },
    options: { type: [String], required: true },
    keywords: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
});

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);