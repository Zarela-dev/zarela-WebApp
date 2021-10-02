import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
	cache: new InMemoryCache(),
});
