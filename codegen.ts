import "dotenv/config"; // ⬅️ charge .env dans process.env AVANT tout le reste
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: process.env.VITE_BACKEND_URL,
	documents: ["src/**/*.{ts,tsx}"],
	ignoreNoDocuments: true,
	generates: {
		"./src/gql/": {
			preset: "client",
			config: { useTypeImports: true },
		},
	},
};

export default config;
