import { Kommune } from '../types/kommune';

async function getMunicipalityByNumber(
  munNumber: string
): Promise<Kommune | null> {
  try {
    const response = await fetch('http://localhost:5000/graphql?', {
      body: '{"query":"{kommune(munNumber: "3014") {id, munNumber, name, Befolkning, ArealKm2, LandarealKm2, InnbyggerePerKm2Landareal, mapImg, weaponImg, writingLanguage}}","variables":null}',
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getAllMunicipalities(): Promise<Kommune[]> {
  try {
    const response = await fetch('http://localhost:5000/graphql?', {
      body: '{"query":"{kommuner {id, munNumber, name, Befolkning, ArealKm2, LandarealKm2, InnbyggerePerKm2Landareal, mapImg, weaponImg, writingLanguage}}","variables":null}',
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const kommuneService = {
  getMunicipalityByNumber,
  getAllMunicipalities,
};

export default kommuneService;
