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
} = require("graphql");

const kommuner = require("../models/kommune");
const kommuneRating = require("../models/kommuneRating");
const county = require("../models/county");
const KommuneType = new GraphQLObjectType({
	name: "Kommune",
	fields: () => ({
		_id: { type: GraphQLID },
		kommuneNumber: { type: GraphQLString },
		name: { type: GraphQLString },
		countyNumber: { type: GraphQLString },
		population: { type: GraphQLInt },
		areaInSquareKm: { type: GraphQLFloat },
		landAreaInSquareKm: { type: GraphQLFloat },
		populationByArea: { type: GraphQLFloat },
		mapUrl: { type: GraphQLString },
		logoUrl: { type: GraphQLString },
		writtenLanguage: { type: GraphQLString },
		kommuneRating: {
			type: new GraphQLList(KommuneRatingType),
			resolve(parent, args) {
				return kommuneRating.find({ kommuneId: parent._id });
			},
		},
		county: {
			type: GraphQLString,
			resolve(parent, args) {
				return county
					.findOne({ countyNumber: parent.countyNumber })
					.then((county) => {
						return county.name;
					});
			},
		},
	}),
});

const KommuneRatingType = new GraphQLObjectType({
	name: "KommuneRating",
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		rating: { type: GraphQLInt },
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
				page: { type: GraphQLInt, defaultValue: 1 },
				pageSize: { type: GraphQLInt, defaultValue: 10 },
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
			args: { kommuneName: { type: GraphQLString } },
			resolve(parent, args) {
				return kommuner.find({ name: args.kommuneName.replace("_", " ") });
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
				rating: { type: GraphQLInt },
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
