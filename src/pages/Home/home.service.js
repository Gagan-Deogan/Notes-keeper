import { gql } from "@apollo/client";

export const GET_USER_NOTES = (userId) => gql`
query {
  Notes (where: {User: {Id: {_eq: ${userId}}}}){
    color
    id
    note
    pin
    labels
    title
  }
}
`;

export const POST_NOTE = (userId, title, note, color, isPin, labels) => gql`
mutation MyMutation {
  insert_Notes_one(object: {color: ${color}, labels: ${labels}, note: ${note}, isPin: ${isPin}, title: ${title}, userId: ${userId}}) {
    id
  }
}
`;
