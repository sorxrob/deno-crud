import { MongoClient, Database } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

console.log(config({export: true}));

const { DB_URI, DB_NAME } = config({ export: true });

const client = new MongoClient();
client.connectWithUri(DB_URI);

const db = client.database(DB_NAME);

export { db };
