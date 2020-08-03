import { MongoClient, Database } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";

import "https://deno.land/x/dotenv/load.ts";

// const { DB_URI, DB_NAME } = config({ export: true });

const client = new MongoClient();
client.connectWithUri(Deno.env.get('DB_URI') || '');

const db = client.database(Deno.env.get('DB_NAME') || '');

export { db };
