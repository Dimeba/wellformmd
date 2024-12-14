import { GraphQLClient } from 'graphql-request'

export function getGraphQLClient(): GraphQLClient {
	const endpoint = process.env.wordpress

	if (!endpoint) {
		throw new Error('wordpress is not defined in environment variables.')
	}

	return new GraphQLClient(endpoint)
}
