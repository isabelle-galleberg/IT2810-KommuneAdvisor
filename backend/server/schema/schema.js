const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const kommuner = require("../models/kommune");

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
      type: KommuneType,
      args: { kommuneNumber: { type: GraphQLString } },
      resolve(parent, args) {
        var x = kommuner.find({ name: "Halden" });
        return x;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});


_id,
kommuneNumber,
name,
population,
areaInSquareKm,
landAreaInSquareKm,
populationByArea,
mapUrl,
logoUrl,
writtenLanguage,