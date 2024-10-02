export const fetchPagesQuery = () => `pageCollection(order: [order_ASC]) {
  items {
    _id
    name
    url
  }
 }

 `