import { App } from 'https://deno.land/x/alosaur@v0.21.1/mod.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';
import transformer from 'https://jspm.dev/class-transformer@0.2.3';

import TodoArea from './src/todo/todo.area.ts';

const { plainToClass } = transformer;

const argPort = parse(Deno.args).port;
const PORT = argPort ? `:${argPort}` : ':8000';

const app = new App({
  areas: [TodoArea],
});

app.useTransform({
  type: 'body', // parse body params
  getTransform: (transform: any, body: any) => {
    return plainToClass(transform, body);
  },
});

app.listen(PORT);
