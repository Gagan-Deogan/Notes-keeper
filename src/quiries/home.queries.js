import { gql } from "@apollo/client";

export const GET_USER_NOTES = gql`
  subscription getUserNotes($userId: String!) {
    Notes(where: { userId: { _eq: $userId } }, order_by: { created_at: desc }) {
      color
      id
      note
      isPin
      labels
      title
    }
  }
`;
export const GET_USER_LABEL = gql`
  subscription getUserLabels($userId: String) {
    Labels(
      where: { userId: { _eq: $userId } }
      order_by: { created_at: desc }
    ) {
      id
      text
    }
  }
`;

export const POST_NOTE = gql`
  mutation(
    $userId: String!
    $title: String!
    $note: String!
    $color: String!
    $labels: String!
    $isPin: Boolean!
  ) {
    insert_Notes_one(
      object: {
        userId: $userId
        note: $note
        title: $title
        color: $color
        labels: $labels
        isPin: $isPin
      }
    ) {
      id
    }
  }
`;

export const POST_LABEL = gql`
  mutation($userId: String!, $text: String!) {
    insert_Labels_one(object: { userId: $userId, text: $text }) {
      id
    }
  }
`;

export const REMOVE_NOTE = gql`
  mutation removeNote($id: Int!) {
    delete_Notes(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
export const REMOVE_LABEL = gql`
  mutation removeLabel($id: Int!) {
    delete_Labels(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote(
    $id: Int!
    $userId: String!
    $title: String!
    $note: String!
    $color: String!
    $labels: String!
    $isPin: Boolean!
  ) {
    update_Notes(
      where: { userId: { _eq: $userId }, _and: { id: { _eq: $id } } }
      _set: {
        note: $note
        title: $title
        color: $color
        labels: $labels
        isPin: $isPin
      }
    ) {
      affected_rows
    }
  }
`;
