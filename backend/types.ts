import { ObjectId } from 'mongodb';

export interface Todo {
    _id?: ObjectId;
  id?: string;
  text: string;
  completed: boolean;
}