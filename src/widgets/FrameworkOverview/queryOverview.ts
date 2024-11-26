export const queryOverview = `pageCollection(order: [order_ASC], where: {name:"Main"}) {
  items {
   content { json }
  }
 }`