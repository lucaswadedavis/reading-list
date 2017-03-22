# [GraphQL: A Tutorial for Getting Started (Hello World)](undefined)

    <<<

## 

Introduction

GraphQL is one of the most exciting technologies gaining developer attention in 2017\. A viable alternative to RESTful APIs, GraphQL APIs provide a much more succinct and expressive way to read and write relational data between client and server.

Two of the more exciting pieces of technology within the GraphQL ecosystem are `graphql-server` and `apollo-client`, built by the folks at [Apollo][0]. In this post, we will focus on discussing high-level GraphQL concepts and getting a basic server up and running with `graphql-server`.

**_You can get the finished source code [here][1]_**

## 

Architecture

At a high level, GraphQL can be thought of as specification for creating strongly-typed transport-agnostic APIs. Before we dive into the nitty-gritty of our server, let's take a quick moment to cover some basic GraphQL nomenclature:

* A [Query][2] is a read-only operation made against a GraphQL server.
* A [Mutation][2] is a read-write operation made against a GraphQL server.
* A [Resolver][3] provides a mapping between a portion of a GraphQL operation and actual backend code responsible for handling it (similar to a controller in a RESTful MVC backend).
* A [Schema][4] defines what queries and mutations can be performed against a GraphQL server, what each query or mutation takes as input, and what each query or mutation returns as output.
* A [Type][5] defines the shape of output / response data that can be returned from the GraphQL server, including fields that are edges to other Types.
* An [Input][6] is like a Type, but defines the shape of input data that is sent to a GraphQL server.
* A [Scalar][7] is a primitive Type, such as a `String`, `Int`, `Boolean`, `Float`, etc.

![GraphQL Architecture Graphic](https://assets.jobstart.com/static/graphql_intro_layout.png)

GraphQL's domain of concern begins at the Client where the request is assembled, and ends at the Resolvers where the request is translated into actual backend code written in a language and paradigm of your choosing. **GraphQL cares nothing about how you store your data or how your frontend works. It is simply a paradigm and language for making requests and rendering responses.** With GraphQL, you can think of your internal data sources as a graph of relational data and traverse those relationships with a natural and expressive language.

## 

First steps

Let's spin up a basic "hello world" server so that we can get our hands dirty with an actual implementation.

If you don't already have NodeJS configured on your system, you will need to [install it][8].

We will be using [esnext-node-starterkit][9] as a project boilerplate, so let's go ahead and clone that now:
    
    git clone git@github.com:thebigredgeek/esnext-node-starterkit.git graphql-demo
    cd graphql-demo
    npm install
    

Now, let's quickly review our project structure:

* `src/index.js` will be the entry point of our server
* `src/resolvers.js` will be where our Resolvers live
* `src/schema.js` will be where our Schema lives

Our boilerplate comes with `src/index.js`. Let's go ahead and create the other two files:
    
    touch src/resolvers.js
    touch src/schema.js
    

## 

Schema

The top-level of a GraphQL Schema is always defined the same way, with a `schema` declaration, so let's write that at the top of our `src/schema.js` file:
    
    /* src/schema.js */
    const schema = `
      schema {
        query: Query
      }
    `;
    

The schema declaration will define a `query` field. In the declaration above, we are mapping `query` to an additional Type called `Query`, which will tell GraphQL what root fields our server can return, what their resolvers will take as input, and the type of the field. Let's define a `helloWorld` field on our initial Query type:
    
    /* src/schema.js */
    
    ...
    
    const Query = `
      type Query {
        helloWorld: String!
      }
    `;
    

Notice that, like in our schema definition, we are mapping `helloWorld` to a separate Type, in the case `String`. `String` is a pre-defined Scalar Type in GraphQL, so we don't need to define it ourselves. The exclamation mark at the end of `String` denotes that our `helloWorld` field will always be a String, and never `null`.

Finally, let's export our GraphQL definitions:
    
    /* src/schema.js */
    
    ...
    
    export default [
      schema,
      Query
    ];
    

Now that we have defined our Schema, let's move on to our Resolvers.

## 

Resolvers

"Resolvers" is a bit of a misnomer here. Because we only have a single field `helloWorld` of Type `String`, we only need a single Resolver to tell GraphQL how to fetch `helloWorld`. Let's go ahead and write the Resolver now:
    
    /* src/resolvers.js */
    export default {
      Query: {
        // Our only Resolver, which belongs to the `Query`
        // Type that we defined before
        helloWorld: () =



[0]: http://www.apollodata.com/
[1]: https://github.com/Jobstart/graphql-hello-world
[2]: http://graphql.org/learn/queries/
[3]: http://graphql.org/learn/execution/
[4]: http://graphql.org/learn/schema/
[5]: http://graphql.org/graphql-js/type/
[6]: http://graphql.org/graphql-js/mutations-and-input-types/
[7]: http://graphql.org/graphql-js/type/#graphqlscalartype
[8]: https://nodejs.org/en/download/
[9]: https://github.com/thebigredgeek/esnext-node-starterkit...
  