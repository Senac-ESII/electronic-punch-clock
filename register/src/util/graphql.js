import gql from "graphql-tag";
/**
 * Get Routes
 */
export const FETCH_POSTS_QUERY = gql`
  {
    getClocksById {
      id
      userId
      timeRegistered
    }
    getClocks {
      id
      userId
      timeRegistered
    }
  }
`;
