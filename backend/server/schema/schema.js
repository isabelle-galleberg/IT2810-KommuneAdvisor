const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLEnumType,
  GraphQLFloat,
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
      args: {
        sortBy: {
          type: new GraphQLEnumType({
            name: "sort",
            values: {
              name: { value: "name" },
              population: { value: "population" },
              area: { value: "area" },
            },
            defaultValue: "name",
          }),
        },
        sortDirection: {
          type: new GraphQLEnumType({
            name: "sortDirection",
            values: {
              ascending: { value: "ascending" },
              descending: { value: "descending" },
            },
            defaultValue: "ascending",
          }),
        },
        page: { type: GraphQLFloat, defaultValue: 1 },
        pageSize: { type: GraphQLFloat, defaultValue: 10 },
        search: { type: GraphQLString },
        county: { type: GraphQLString },
      },
      resolve(parent, args) {
        let query = kommuner.find({});
        if (args.search)
          query = query.find({
            name: { $regex: args.search, $options: "i" },
          });
        if (args.sortBy) {
          query = query.sort({
            [args.sortBy]: args.sortDirection === "descending" ? -1 : 1,
          });
        }
        query.skip((args.page - 1) * args.pageSize).limit(args.pageSize);
        return query;
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

module.exports = new GraphQLSchema({
  query: RootQuery,
});
