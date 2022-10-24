const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");

const kommuner = require("../models/kommune");
const kommuneRating = require("../models/kommuneRating");

const KommuneType = new GraphQLObjectType({
  name: "Kommune",
  fields: () => ({
    _id: { type: GraphQLID },
    kommuneNumber: { type: GraphQLString },
    name: { type: GraphQLString },
    population: { type: GraphQLString },
    areaInSquareKm: { type: GraphQLString },
    landAreaInSquareKm: { type: GraphQLString },
    populationByArea: { type: GraphQLString },
    mapUrl: { type: GraphQLString },
    logoUrl: { type: GraphQLString },
    writtenLanguage: { type: GraphQLString },
    kommuneRating: {
      type: new GraphQLList(KommuneRatingType),
      resolve(parent, args) {
        return kommuneRating.find({ kommuneId: parent._id });
      },
    },
  }),
});

const KommuneRatingType = new GraphQLObjectType({
  name: "KommuneRating",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    rating: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    kommuneNumber: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    kommuner: {
      type: new GraphQLList(KommuneType),
      resolve(parent, args) {
        return kommuner.find({});
      },
    },
    kommune: {
      type: new GraphQLList(KommuneType),
      args: { kommuneNumber: { type: GraphQLString } },
      resolve(parent, args) {
        return kommuner.find({ kommuneNumber: args.kommuneNumber });
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    addKommuneRating: {
      type: KommuneRatingType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLFloat },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        kommuneId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { name, rating, title, description, kommuneId } = args;
        const newKommuneRating = new kommuneRating({
          name,
          rating,
          title,
          description,
          kommuneId,
          timestamp: new Date(),
        });
        return newKommuneRating.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
