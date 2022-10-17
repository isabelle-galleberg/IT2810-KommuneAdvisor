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
        return dataSet;
      },
    },
    kommune: {
      type: KommuneType,
      args: { region_nr: { type: GraphQLString } },
      resolve(parent, args) {
        return dataSet.find((kommune) => kommune.region_nr === args.region_nr);
      },
    },
  },
});

const dataSet = [
  {
    kommuneNumber: "3001",
    region: "Halden",
    population: 31444,
    areaInSquareKm: 642,
    landAreaInSquareKm: 595,
    populationByArea: 53,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/f/f9/NO_3001_Halden.svg/512px-NO_3001_Halden.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Halden_komm.svg/512px-Halden_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3002",
    region: "Moss",
    population: 50290,
    areaInSquareKm: 138,
    landAreaInSquareKm: 128,
    populationByArea: 393,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/b/b7/NO_3002_Moss.svg/512px-NO_3002_Moss.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Rygge_komm.svg/512px-Rygge_komm.svg.png",
    writtenLanguage: "nøytral",
  },
  {
    kommuneNumber: "3003",
    region: "Sarpsborg",
    population: 58182,
    areaInSquareKm: 406,
    landAreaInSquareKm: 370,
    populationByArea: 157,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/a/a5/NO_3003_Sarpsborg.svg/512px-NO_3003_Sarpsborg.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/4/43/Sarpsborg_komm.svg/512px-Sarpsborg_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3004",
    region: "Fredrikstad",
    population: 83892,
    areaInSquareKm: 293,
    landAreaInSquareKm: 284,
    populationByArea: 295,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/d/d9/NO_3004_Fredrikstad.svg/512px-NO_3004_Fredrikstad.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/9/91/Fredrikstad_komm.svg/512px-Fredrikstad_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3005",
    region: "Drammen",
    population: 102273,
    areaInSquareKm: 318,
    landAreaInSquareKm: 305,
    populationByArea: 335,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/f/fe/NO_3005_Drammen.svg/512px-NO_3005_Drammen.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/2/25/Drammen_komm.svg/512px-Drammen_komm.svg.png",
    writtenLanguage: "nøytral",
  },
  {
    kommuneNumber: "3006",
    region: "Kongsberg",
    population: 27879,
    areaInSquareKm: 793,
    landAreaInSquareKm: 754,
    populationByArea: 37,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/4/4b/NO_3006_Kongsberg.svg/512px-NO_3006_Kongsberg.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kongsberg_komm.svg/512px-Kongsberg_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3007",
    region: "Ringerike",
    population: 31011,
    areaInSquareKm: 1555,
    landAreaInSquareKm: 1422,
    populationByArea: 22,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/8/81/NO_3007_Ringerike.svg/512px-NO_3007_Ringerike.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Ringerike_komm.svg/512px-Ringerike_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3011",
    region: "Hvaler",
    population: 4741,
    areaInSquareKm: 90,
    landAreaInSquareKm: 90,
    populationByArea: 53,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/7/73/NO_3011_Hvaler.svg/512px-NO_3011_Hvaler.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/8/89/Hvaler_komm.svg/512px-Hvaler_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3012",
    region: "Aremark",
    population: 1315,
    areaInSquareKm: 319,
    landAreaInSquareKm: 282,
    populationByArea: 5,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/4/4c/NO_3012_Aremark.svg/512px-NO_3012_Aremark.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Aremark_komm.svg/512px-Aremark_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3013",
    region: "Marker",
    landAreaInSquareKm: 368,
    populationByArea: 10,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/e/e0/NO_3013_Marker.svg/512px-NO_3013_Marker.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/4/46/Marker_komm.svg/512px-Marker_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3014",
    region: "Indre Østfold",
    population: 45608,
    areaInSquareKm: 792,
    landAreaInSquareKm: 755,
    populationByArea: 60,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/3/3b/NO_3014_Indre_%C3%98stfold.svg/512px-NO_3014_Indre_%C3%98stfold.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Indre_%C3%98stfold_komm.svg/512px-Indre_%C3%98stfold_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3015",
    region: "Skiptvet",
    population: 3846,
    areaInSquareKm: 101,
    landAreaInSquareKm: 93,
    populationByArea: 41,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/e/ec/NO_3015_Skiptvet.svg/512px-NO_3015_Skiptvet.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Skiptvet_komm.svg/512px-Skiptvet_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3016",
    region: "Rakkestad",
    population: 8312,
    areaInSquareKm: 435,
    landAreaInSquareKm: 421,
    populationByArea: 20,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/a/af/NO_3016_Rakkestad.svg/512px-NO_3016_Rakkestad.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Rakkestad_komm.svg/512px-Rakkestad_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3017",
    region: "Råde",
    population: 7633,
    areaInSquareKm: 119,
    landAreaInSquareKm: 105,
    populationByArea: 73,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/c/c7/NO_3017_R%C3%A5de.svg/512px-NO_3017_R%C3%A5de.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/4/41/R%C3%A5de_komm.svg/512px-R%C3%A5de_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3018",
    region: "Våler (Viken)",
    population: 5913,
    areaInSquareKm: 257,
    landAreaInSquareKm: 239,
    populationByArea: 25,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/6/6f/NO_3018_V%C3%A5ler.svg/512px-NO_3018_V%C3%A5ler.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/3/33/V%C3%A5ler_%C3%98stfold_komm.svg/512px-V%C3%A5ler_%C3%98stfold_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3019",
    region: "Vestby",
    population: 18699,
    areaInSquareKm: 134,
    landAreaInSquareKm: 134,
    populationByArea: 140,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/a/af/NO_3019_Vestby.svg/512px-NO_3019_Vestby.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/8/81/Vestby_komm.svg/512px-Vestby_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3020",
    region: "Nordre Follo",
    population: 61032,
    areaInSquareKm: 203,
    landAreaInSquareKm: 196,
    populationByArea: 311,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/8/84/NO_3020_Nordre_Follo.svg/512px-NO_3020_Nordre_Follo.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Nordre_Follo_komm.svg/512px-Nordre_Follo_komm.svg.png",
    writtenLanguage: "nøytral",
  },
  {
    kommuneNumber: "3021",
    region: "\u00c3\u2026s",
    population: 20780,
    areaInSquareKm: 103,
    landAreaInSquareKm: 101,
    populationByArea: 206,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/9/9a/NO_3021_%C3%85s.svg/512px-NO_3021_%C3%85s.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/b/ba/%C3%85s_komm.svg/512px-%C3%85s_komm.svg.png",
    writtenLanguage: "nøytral",
  },
  {
    kommuneNumber: "3022",
    region: "Frogn",
    population: 16084,
    areaInSquareKm: 86,
    landAreaInSquareKm: 85,
    populationByArea: 189,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/1/18/NO_3022_Frogn.svg/512px-NO_3022_Frogn.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Frogn_komm.svg/512px-Frogn_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3023",
    region: "Nesodden",
    population: 19939,
    areaInSquareKm: 61,
    landAreaInSquareKm: 61,
    populationByArea: 327,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/0/02/NO_3023_Nesodden.svg/512px-NO_3023_Nesodden.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/5/59/Nesodden_komm.svg/512px-Nesodden_komm.svg.png",
    writtenLanguage: "bokmål",
  },
  {
    kommuneNumber: "3024",
    region: "Bærum",
    population: 128982,
    areaInSquareKm: 192,
    landAreaInSquareKm: 189,
    populationByArea: 682,
    mapUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/8/80/NO_3024_B%C3%A6rum.svg/512px-NO_3024_B%C3%A6rum.svg.png",
    logoUrl:
      "upload.wikimedia.org/wikipedia/commons/thumb/b/bd/B%C3%A6rum_komm.svg/512px-B%C3%A6rum_komm.svg.png",
    writtenLanguage: "bokmål",
  },
];

module.exports = new GraphQLSchema({
  query: RootQuery,
});
