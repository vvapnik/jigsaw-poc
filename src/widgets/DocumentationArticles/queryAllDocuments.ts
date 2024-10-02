export const queryAllDocuments =  `documentationCollection(order: [order_ASC]) {
  items {
    _id
    title
    description
    article { json }
  }
 }

 `