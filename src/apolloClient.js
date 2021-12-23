import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

export const client = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
	cache: new InMemoryCache(),
});

export const searchClient = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/nightmareinc/zarela-requests',
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					requestDetails: offsetLimitPagination(),
					confirmations: offsetLimitPagination(),
					contributions: offsetLimitPagination(),
					requests: offsetLimitPagination(),
				},
			},
		},
	}),
});
