import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// スキーマ（データ構造）
const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    price: Int
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: '星の王子さま',
    author: 'サンテグジュペリ',
    price: 720,
  },
  {
    id: 2,
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
  typeDefs,  // スキーマ
  resolvers,  // リゾルバ
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