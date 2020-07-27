import {
  Controller,
  Post,
  Body,
  Content,
  Get,
  ActionResult,
  Param,
  Delete,
  Put,
} from "https://deno.land/x/alosaur@v0.21.1/mod.ts";
import validator from "https://jspm.dev/class-validator@0.8.5";
import { TodoModel, FormattedTodo } from "./todo.model.ts";
import TodoService from "./todo.service.ts";

const { validate } = validator;

@Controller("/todos")
export default class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  async index(): Promise<FormattedTodo[]> {
    return this.todoService.findAll();
  }

  @Get("/:id")
  async show(@Param("id") id: string): Promise<FormattedTodo | ActionResult> {
    const todo = await this.todoService.findById(id);

    if (todo) {
      return todo;
    }

    return Content("Todo not found", 404);
  }

  @Post()
  async store(@Body(TodoModel) data: TodoModel): Promise<ActionResult> {
    const errors = await validate(data, { validationError: { target: false } });

    if (errors.length) {
      return Content(errors, 400);
    }

    const result = await this.todoService.create(data);
    return Content(result, 201);
  }

  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body(TodoModel) data: TodoModel,
  ): Promise<ActionResult | any> {
    const errors = await validate(data, { validationError: { target: false } });

    if (errors.length) {
      return Content(errors, 400);
    }

    await this.todoService.update(id, data);
    return {
      id,
      ...data,
    };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<string> {
    return this.todoService.removeById(id);
  }
}
