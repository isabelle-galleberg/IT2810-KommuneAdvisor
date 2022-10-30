const fs = require('fs');
const kommune = require('../server/models/kommune');
const county = require('../server/models/county');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../server/config/db');
const kommuneRating = require('../server/models/kommuneRating');

connectDB().then(async () => {
  await kommuneRating.deleteMany({});
  await county.deleteMany({});
  fs.readFile('./data/fylker.json', (err, rawdata) => {
    const couties = JSON.parse(rawdata);
    const importData = async () => {
      for (const _county of couties) {
        try {
          const newCounty = new county({
            _id: _county._id,
            name: _county.name,
          });
          await newCounty.save();
        } catch (err) {
          console.log(err);
        }
      }
    };
    importData();
  });
  await kommune.deleteMany({});
  fs.readFile('./data/export.json', (err, rawkommuner) => {
    const kommuner = JSON.parse(rawkommuner);
    const importData = async () => {
      for (const _kommune of kommuner) {
        try {
          const newKommune = new kommune({
            _id: _kommune._id,
            name: _kommune.name,
            population: _kommune.population,
            areaInSquareKm: _kommune.areaInSquareKm,
            landAreaInSquareKm: _kommune.landAreaInSquareKm,
            populationByArea: _kommune.populationByArea,
            mapUrl: _kommune.mapUrl,
            logoUrl: _kommune.logoUrl,
            snlLink: _kommune.snlLink,
            writtenLanguage: _kommune.writtenLanguage,
            kommuneRating: _kommune.kommuneRating,
            county: _kommune.county,
          });
          await newKommune.save();
        } catch (err) {
          console.log(err);
        }
      }
    };
    importData();
    console.log('Data imported');
  });
});
