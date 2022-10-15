const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const KommuneType = new GraphQLObjectType({
  name: "Kommune",
  fields: () => ({
    id: { type: GraphQLID },
    munNumber: { type: GraphQLString },
    name: { type: GraphQLString },
    Befolkning: { type: GraphQLString },
    ArealKm2: { type: GraphQLString },
    LandarealKm2: { type: GraphQLString },
    InnbyggerePerKm2Landareal: { type: GraphQLString },
    mapImg: { type: GraphQLString },
    weaponImg: { type: GraphQLString },
    writingLanguage: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    kommuner: {
      type: new GraphQLList(KommuneType),
      resolve(parent, args) {
        return dataSet;
      },
    },
    kommune: {
      type: KommuneType,
      args: { munNumber: { type: GraphQLString } },
      resolve(parent, args) {
        return dataSet.find((kommune) => kommune.munNumber === args.munNumber);
      },
    },
  },
});

const dataSet = [
  {
    munNumber: "3013",
    name: "Marker",
    Befolkning: 3578,
    ArealKm2: 413,
    LandarealKm2: 368,
    InnbyggerePerKm2Landareal: 10,
    mapImg:
      "upload.wikimedia.org/wikipedia/commons/thumb/e/e0/NO_3013_Marker.svg/512px-NO_3013_Marker.svg.png",
    weaponImg:
      "upload.wikimedia.org/wikipedia/commons/thumb/4/46/Marker_komm.svg/512px-Marker_komm.svg.png",
    writingLanguage: "bokmål",
  },
  {
    munNumber: "3014",
    name: "Indre Østfold",
    Befolkning: 45608,
    ArealKm2: 792,
    LandarealKm2: 755,
    InnbyggerePerKm2Landareal: 60,
    mapImg:
      "upload.wikimedia.org/wikipedia/commons/thumb/3/3b/NO_3014_Indre_%C3%98stfold.svg/512px-NO_3014_Indre_%C3%98stfold.svg.png",
    weaponImg:
      "upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Indre_%C3%98stfold_komm.svg/512px-Indre_%C3%98stfold_komm.svg.png",
    writingLanguage: "bokmål",
  },
  {
    munNumber: "3015",
    name: "Skiptvet",
    Befolkning: 3846,
    ArealKm2: 101,
    LandarealKm2: 93,
    InnbyggerePerKm2Landareal: 41,
    mapImg:
      "upload.wikimedia.org/wikipedia/commons/thumb/e/ec/NO_3015_Skiptvet.svg/512px-NO_3015_Skiptvet.svg.png",
    weaponImg:
      "upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Skiptvet_komm.svg/512px-Skiptvet_komm.svg.png",
    writingLanguage: "bokmål",
  },
];

module.exports = new GraphQLSchema({
  query: RootQuery,
});
