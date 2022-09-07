import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";

import { InsertJob } from "./graphql-types";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://api.thegraph.com/subgraphs/name/prayagsingh/socllydemos", fetch }),
  cache: new InMemoryCache(),
});


const doQuery = async () => {
    const APPOINTMENT_DETAILS_REQUEST = gql`
  query AppointmentDetails($id: ID) {
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
    charitySchemas(where: {isActive: true}) {
      ${CHARITY_FIELDS}
    }
  }`
    const {data, error, loading, errors, partial} = await nodeClient.query({
      query: APPOINTMENT_DETAILS_REQUEST,
      pollInterval: 6000,
      variables: {
        id: '0x0100'
      },
    })
    console.log(data)
    return data;
  } 

  const nodeClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/prayagsingh/socllydemos',
    cache
  })

  module.exports = doQuery;