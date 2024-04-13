import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { join } from 'path';

// スキーマ（データ構造）
const __dirname = new URL(import.meta.url).pathname;
const schema = loadSchemaSync(join(__dirname, '../../schema/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const books = [
  {
    id: '1',
    title: '星の王子さま',
    author: 'サンテグジュペリ',
    price: 720,
  },
  {
    id: '2',
    title: '銀河鉄道の夜',
    author: '宮沢賢治',
    price: 520,
  },
];

// リゾルバ（ロジック）
const resolvers = {
  Query: {
    books: () => books,
  },
};

// Apolloサーバ
const server = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers })
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

// http://localhost:4000でApolloのサンドボックスが開くのでそこでクエリを実行して確認
console.log(`🚀  Server ready at: ${url}`);