import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getClocks {
      id
      userId
      timeRegistered
    },
    getClocksById {
      id
      userId
      timeRegistered
    }
  }
`;
