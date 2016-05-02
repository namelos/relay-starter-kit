import {
  GraphQLObjectType as ObjectType,
  GraphQLSchema as Schema,
  GraphQLString as String,
} from 'graphql'

const GreetingsType = new ObjectType({
  name: 'Greetings',
  fields: () => ({
    hello: { type: String }
  })
})

export default new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: () => ({
      greetings: {
        type: GreetingsType,
        resolve: () => ({ hello: 'Hello world!' })
      }
    })
  })
})
