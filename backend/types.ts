import { ObjectId } from 'mongodb';

export interface Todo {
  id?: ObjectId;
  text: string;
  completed: boolean;
}