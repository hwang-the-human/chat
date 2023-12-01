import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: ['./src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/': {
      schema: 'http://localhost:4001/graphql',
      plugins: [],
      preset: 'client',
    },
  },
};
export default config;
