import { App } from 'https://deno.land/x/alosaur@v0.21.1/mod.ts';
import TodoArea from './src/todo/todo.area.ts';
import transformer from 'https://jspm.dev/class-transformer@0.2.3';

const { plainToClass } = transformer;

const app = new App({
  areas: [TodoArea],
});

app.useTransform({
  type: 'body', // parse body params
  getTransform: (transform: any, body: any) => {
    return plainToClass(transform, body);
  },
});

app.listen();
