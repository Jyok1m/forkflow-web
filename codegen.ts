import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	// Schéma lu depuis l'API en cours d'exécution (autoSchemaFile en mémoire)
	schema: "http://127.0.0.1:3000/graphql",
	// Où chercher tes opérations gql`...`
	documents: ["src/**/*.{ts,tsx}"],
	ignoreNoDocuments: true,
	generates: {
		"./src/gql/": {
			preset: "client",
			config: {
				useTypeImports: true,
			},
		},
	},
};

export default config;
