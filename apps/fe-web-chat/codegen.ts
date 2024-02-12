import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: ['./src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/': {
      schema: `${process.env.NX_BE_GATEWAY_URL}/graphql/`,
      plugins: [],
      preset: 'client',
    },
  },
};
export default config;
