// GRAPHQL QUERIES
// QUESTION 1:
// {

//   author(country: "USA"){
//     id
//     name
//     books{
//       id
//       title
//     }
//   }

// }

// QUESTION 2:
// {

//   author(name: "Brent Weeks"){
//     count
//   }

// }


const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')
  const app = express()
  
  const authors = [
      { id: 1, name: 'J. K. Rowling', country: 'UK'},
      { id: 2, name: 'J. R. R. Tolkien', country: 'USA'},
      { id: 3, name: 'Brent Weeks', country: 'USA'}
  ]


  const books = [
    { id: 1, title: 'Harry Potter and the Chamber of Secrets', price: 100 },
    { id: 2, title: 'Harry Potter and the Prisoner of Azkaban', price: 200 },
    { id: 3, title: 'Harry Potter and the Goblet of Fire', price: 500 },
    { id: 4, title: 'The Fellowship of the Ring', price: 100 },
    { id: 5, title: 'The Two Towers', price: 200 },
    { id: 6, title: 'The Return of the King', price: 200 },
    { id: 7, title: 'The Way of Shadows', price: 300 },
    { id: 8, title: 'Beyond the Shadows', price: 300 }
  ]
  
  
  const pbooks = [
      { id: 1, authorId: 1, bookId: 1, pdate: '1-1-2021' },
      { id: 2, authorId: 1, bookId: 2, pdate: '1-1-2021' },
      { id: 3, authorId: 1, bookId: 3, pdate: '1-1-2021' },
      { id: 4, authorId: 2, bookId: 4, pdate: '2-1-2021' },
      { id: 5, authorId: 2, bookId: 5, pdate: '2-1-2021' },
      { id: 6, authorId: 2, bookId: 6, pdate: '2-1-2021' },
      { id: 7, authorId: 3, bookId: 7, pdate: '3-1-2021' },
      { id: 8, authorId: 3, bookId: 8, pdate: '3-1-2021' }
  ]
  
  const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      title: { type: GraphQLNonNull(GraphQLString) },
      price: { type: GraphQLNonNull(GraphQLInt) }

    })
  })
  
  const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents a author of a book',
    
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      country: { type: GraphQLNonNull(GraphQLString) },
      pbooks: {
        type: new GraphQLList(PBookType),
        resolve: (author) => {
          return pbooks.filter(pbook => pbook.authorId === author.id)
        }
      },

      books: {
        type: new GraphQLList(BookType),
        resolve: (author) => {
          return books.filter(book => book.id == (pbooks.find(pbook => pbook.authorId==author.id)).bookId)
        }
      },

      count: {
        type: GraphQLInt,
        resolve: (author) => {
            return ((pbooks.filter(pbook => pbook.authorId === author.id )).length)
        }
      }

    })
  })

  
  const PBookType = new GraphQLObjectType({
    name: 'PBook',
    description: 'This represents a published book',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      authorId: { type: GraphQLNonNull(GraphQLInt) },
      bookId: { type: GraphQLNonNull(GraphQLInt) },
      pdate: { type: GraphQLNonNull(GraphQLString) }
    })
  })
  
  const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      book: {
        type: BookType,
        description: 'A Single Book',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => books.find(book => book.id === args.id)
      },
      books: {
        type: new GraphQLList(BookType),
        description: 'List of All Books',
        resolve: () => books
      },
      authors: {
        type: new GraphQLList(AuthorType),
        description: 'List of All Authors',
        resolve: () => authors
      },
      author: {
        type: AuthorType,
        description: 'A Single Author',
        args: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
          country: { type: GraphQLString }
        },
        resolve: (parent, args) => authors.find(author => author.id === args.id || author.name === args.name || author.country === args.country)
      },
      pbook: {
        type: PBookType,
        description: 'A Single Published Book',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => pbooks.find(pbook => pbook.id === args.id)
      },
      pbooks: {
        type: new GraphQLList(PBookType),
        description: 'List of All Published Books',
        resolve: () => pbooks
      }
    })
  })
  
  
  const schema = new GraphQLSchema({
    query: RootQueryType
  })
  
  app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
  }))
  app.listen(5000, () => console.log('Server Running'))