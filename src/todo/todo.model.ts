import validator from 'https://jspm.dev/class-validator@0.8.5';

const { IsBoolean, IsNotEmpty } = validator;

export interface Todo {
  _id: { $oid: string };
  title: string;
  body?: string;
  completed: boolean;
}

export interface FormattedTodo extends Omit<Todo, '_id'> {
  id: string;
}

export class TodoModel {
  @IsNotEmpty({
    message: 'Title is required',
  })
  title?: string;

  body?: string;

  @IsBoolean({
    message: 'Completed is required and must be a boolean',
  })
  completed?: boolean;
}
