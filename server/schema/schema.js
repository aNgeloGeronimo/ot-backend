const Product = require('../models/Product');
const Client = require('../models/Client');

const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        money: {type: GraphQLFloat},
    }),
});

//Product Type
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        apparel: {type: GraphQLString},
        url:{type: GraphQLString},
        target: {type: GraphQLString},
        price: {type: GraphQLFloat},
        description: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id);
            },
        },
        
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            },
        },

        product: {
            type: ProductType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Product.findById(args.id)
            },
        },

        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find();
            },
        },
    }
});

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args:{
                username: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)},
                money: {type: GraphQLNonNull(GraphQLFloat)},
            },
            resolve(parent, args){
                const client = new Client({
                    username: args.username,
                    email: args.email,
                    password: args.password,
                    money: args.money,
                });

                return client.save();
            },
        },

        deleteClient: {
            type: ClientType, 
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Client.findByIdAndRemove(args.id);
            },
        },

        addProduct: {
            type: ProductType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                apparel: {type: GraphQLNonNull(GraphQLString)},
                target: {type: GraphQLNonNull(GraphQLString)},
                url: {type: GraphQLNonNull(GraphQLString)},
                price: {type: GraphQLNonNull(GraphQLFloat)},
                description: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const product = new Product({
                    name: args.name,
                    apparel: args.apparel,
                    target: args.target,
                    url: args.url,
                    price: args.price,
                    description: args.description,
                });

                return product.save();
            },
        },

        deleteProduct: {
            type: ProductType, 
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Product.findByIdAndRemove(args.id);
            },
        },
    },
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});