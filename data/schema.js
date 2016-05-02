import {
  GraphQLObjectType as ObjectType,
  GraphQLSchema as Schema,
  GraphQLNonNull as NonNull,
  GraphQLString as String,
  GraphQLList as List
} from 'graphql'

const data = {
  "1": {
    "id": "1",
    "name": "Dan"
  },
  "2": {
    "id": "2",
    "name": "Marie"
  },
  "3": {
    "id": "3",
    "name": "Jessie"
  }
}

const GreetingsType = new ObjectType({
  name: 'Greetings',
  fields: () => ({
    hello: { type: String }
  })
})

const userType = new ObjectType({
  name: 'User',
  description: 'sample user type',
  fields: () => ({
    id: { type: String },
    name: { type: String }
  })
})

const Post = new ObjectType({
  name: 'Post',
  description: 'This represent a Post',
  fields: () => ({
    _id: { type: new NonNull(String) },
    title: { type: new NonNull(String) },
    content: { type: String }
  })
})

export default new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: () => ({
      user: {
        type: userType,
        args: {
          id: { type: String }
        },
        resolve: (_, args) => data[args.id]
      },
      echo: {
        type: String,
        description: 'Echo what you enter',
        args: {
          message: { type: String }
        },
        resolve: (_, args) => `received ${args.message}`
      },
      greetings: {
        type: GreetingsType,
        resolve: () => ({ hello: data['2']['name'] })
      }
    })
  })
})
