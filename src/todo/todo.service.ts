import { TodoModel, Todo, FormattedTodo } from './todo.model.ts';
import { db } from '../../db.ts';

const todos = db.collection<Todo>('todos');

export default class TodoService {
  async findAll(): Promise<FormattedTodo[]> {
    const result = await todos.find();
    return result.map((todo) => {
      return {
        id: todo._id.$oid,
        title: todo.title,
        body: todo.body,
        completed: todo.completed,
      };
    });
  }

  async findById(id: string): Promise<FormattedTodo | null> {
    const todo = await todos.findOne({
      _id: {
        $oid: id,
      },
    });

    if (todo) {
      return {
        id: todo._id.$oid,
        title: todo.title,
        body: todo.body,
        completed: todo.completed,
      };
    }

    return null;
  }

  async create(data: TodoModel): Promise<any> {
    const result = await todos.insertOne(data);
    return {
      id: result.$oid,
      title: data.title,
      body: data.body,
      completed: data.completed,
    };
  }

  async update(id: string, data: TodoModel): Promise<string> {
    await todos.updateOne(
      {
        _id: {
          $oid: id,
        },
      },
      data
    );
    return id;
  }

  async removeById(id: string): Promise<string> {
    await todos.deleteOne({
      _id: {
        $oid: id,
      },
    });
    return id;
  }
}
