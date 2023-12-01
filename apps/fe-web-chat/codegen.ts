import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: ['./src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/users/': {
      schema: 'http://localhost:3000/graphql',
      plugins: [],
      preset: 'client',
    },
    // 'src/graphql/chats/': {
    //   schema: 'http://localhost:3001/graphql',
    //   plugins: [],
    //   preset: 'client',
    // },
  },
};
export default config;
