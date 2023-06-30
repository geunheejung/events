export {};

declare global {
  var _mongo: Promise<MongoClient>;
}

namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
  }
}
