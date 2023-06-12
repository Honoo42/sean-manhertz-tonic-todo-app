import { ObjectId } from 'mongodb';

export interface Todo {
    _id?: ObjectId;
  id?: number;
  text: string;
  completed: boolean;
}