import { MongoClient, Database } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

console.log(config);

const client = new MongoClient();
client.connectWithUri(config().DB_URI);

const db = client.database(config().DB_NAME);

export { db };
