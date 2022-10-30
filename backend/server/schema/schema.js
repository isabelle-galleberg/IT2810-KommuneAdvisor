const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLNonNull,
} = require('graphql');

const kommuner = require('../models/kommune');
const kommuneRating = require('../models/kommuneRating');
const county = require('../models/county');
const KommuneType = new GraphQLObjectType({
  name: 'Kommune',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    population: { type: GraphQLInt },
    areaInSquareKm: { type: GraphQLFloat },
    landAreaInSquareKm: { type: GraphQLFloat },
    populationByArea: { type: GraphQLFloat },
    mapUrl: { type: GraphQLString },
    snlLink: { type: GraphQLString },
    logoUrl: { type: GraphQLString },
    writtenLanguage: { type: GraphQLString },
    averageRating: { type: GraphQLFloat },
    county: {
      type: CountyType,
      resolve(parent, args) {
        return county.findById(parent.county);
      },
    },
    kommuneRating: {
      type: new GraphQLList(KommuneRatingType),
      async resolve(parent, args) {
        return kommuneRating.find({ kommune: parent._id }).exec();
      },
    },
  }),
});

const KommuneRatingType = new GraphQLObjectType({
  name: 'KommuneRating',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    rating: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    kommune: { type: GraphQLString },
  }),
});

const CountyType = new GraphQLObjectType({
  name: 'County',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    kommuner: {
      type: new GraphQLList(KommuneType),
      args: {
        sortBy: {
          type: new GraphQLEnumType({
            name: 'sort',
            values: {
              name: { value: 'name' },
              population: { value: 'population' },
              area: { value: 'landAreaInSquareKm' },
              rating: { value: 'averageRating' },
            },
            defaultValue: 'name',
          }),
        },
        sortDirection: {
          type: new GraphQLEnumType({
            name: 'sortDirection',
            values: {
              ascending: { value: 'ascending' },
              descending: { value: 'descending' },
            },
            defaultValue: 'ascending',
          }),
        },
        page: { type: GraphQLInt, defaultValue: 1 },
        pageSize: { type: GraphQLInt, defaultValue: 10 },
        search: { type: GraphQLString },
        county: { type: GraphQLString },
      },
      resolve(parent, args) {
        let query = kommuner.find({});
        if (args.county) {
          query = query.find({ county: args.county });
        }
        if (args.search)
          query = query.find({
            name: { $regex: args.search, $options: 'i' },
          });
        if (args.sortBy) {
          query = query.sort({
            [args.sortBy]: args.sortDirection === 'descending' ? -1 : 1,
          });
        }
        query.skip((args.page - 1) * args.pageSize).limit(args.pageSize);
        return query;
      },
    },
    kommune: {
      type: KommuneType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return kommuner.findOne({ _id: args.id });
      },
    },
    counties: {
      type: new GraphQLList(CountyType),
      resolve(parent, args) {
        return county.find({});
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addKommuneRating: {
      type: KommuneRatingType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLInt },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        kommuneId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { name, rating, title, description, kommuneId } = args;
        const kommuneRatings = await kommuneRating.find({
          kommune: kommuneId,
        });
        const ratings = await kommuneRatings.map((rating) => rating.rating);
        ratings.push(args.rating);
        const sum = ratings.reduce((a, b) => a + b, 0);
        const averageRating = sum / ratings.length;
        const kommune = await kommuner.findById(kommuneId);
        kommune.averageRating = averageRating;
        kommune.save();
        const newKommuneRating = new kommuneRating({
          name,
          rating,
          title,
          description,
          kommune: kommuneId,
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
