export const fetchCurrentPageQuery = (url: string) => `pageCollection(where:{url:"${url}"}) {
  items {
    _id
    name
    url
  }
 }

 `