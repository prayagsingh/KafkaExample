const {ApolloClient, gql} = require('apollo-boost');
const fetch = require('cross-fetch/polyfill').fetch;
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;

const client = new ApolloClient({
    link: createHttpLink({
        uri: "https://subgraph-url",
        fetch: fetch
    }),
    cache: new InMemoryCache()
});

const doQuery = async () =>{ 
    return await client.watchQuery({
        pollInterval: 1000,
        query: gql`
        query MyQuery { requesters(first: 1) {
            id
            address
            cid
            details {
                id
                handle
                name
                title
                bio
                avatar
                location
                socialGivenLinks {
                    id
                    platform
                    link
                }
            }
            } 
        }
        `,
    }).subscribe((data, ) =>{
        return data;
    })
}

module.exports = doQuery

/***
 requesters(first: 1) {
    id
    address
    cid
    details {
      id
      handle
      name
      title
      bio
      avatar
      location
      socialGivenLinks {
        id
        platform
        link
      }
    }
  } 
 */