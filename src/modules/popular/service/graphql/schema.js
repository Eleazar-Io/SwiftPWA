import { gql } from '@apollo/client';

export const getPopular = gql`
query{
    products(search: "new"){
      items{
        name
        image{
          url
        },
        id
      }
    }
  }
`;

export const unSubsrcibe = gql`
mutation unsubscribe($email: String){
  unSubscribe(input: {email: $email}){
    status{
      message
      code
    }
  }
}
`;
