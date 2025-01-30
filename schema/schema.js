const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Item {
      id: ID!
      name: String!
      img: String!
      price: Int!
      ratings: Int!
    }
  
    type Query {
      items: [Item!]!
      item(id: ID!): Item  # Add this query to fetch a single item by its id
    }
  
    type Mutation {
      addItem(name: String!, img: String!, price: Int!, ratings: Int!): Item
    }
  `);
module.exports = schema;
