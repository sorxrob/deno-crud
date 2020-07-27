import {
  Area,
} from "https://deno.land/x/alosaur@v0.21.1/mod.ts";
import TodoController from "./todo.controller.ts";

@Area({
  controllers: [TodoController],
})
export default class TodoArea {
}
