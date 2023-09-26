import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'https://c2b9-202-80-218-247.ngrok-free.app/',
  uri: 'http://lj-mobile.blackopals.shop/',
  cache: new InMemoryCache(),
});

export default client