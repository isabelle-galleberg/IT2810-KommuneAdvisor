import './MainPage.css';
import KommuneCard from '../../components/KommuneCard/KommuneCard';
import { SimpleGrid } from '@mantine/core';
import InputFields from '../../components/InputFields/InputFields';
import Search from '../../components/Search/Search';
import { useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';

const dummy = [
  {
    id: 1,
    name: 'Lier',
    county: 'Viken',
    weaponImg: require('../../assets/lier.svg.png'),
    rating: 1,
    area: 100,
    population: 3333,
  },
  {
    id: 2,
    name: 'Berlevåg',
    county: 'Troms og Finnmark',
    weaponImg: require('../../assets/berlevag.svg.png'),
    rating: 2,
    area: 400,
    population: 5723,
  },
  {
    id: 3,
    name: 'Vardø',
    county: 'Troms og Finnmark',
    weaponImg: require('../../assets/sande.svg.png'),
    rating: 3,
    area: 400,
    population: 5753,
  },
  {
    id: 4,
    name: 'Sande',
    county: 'Møre og Romsdal',
    weaponImg: require('../../assets/vardo.svg.png'),
    rating: 2,
    area: 100,
    population: 25201,
  },
  {
    id: 5,
    name: 'Lier',
    county: 'Viken',
    weaponImg: require('../../assets/lier.svg.png'),
    rating: 1,
    area: 400,
    population: 30123,
  },
  {
    id: 6,
    name: 'Berlevåg',
    county: 'Troms og Finnmark',
    weaponImg: require('../../assets/berlevag.svg.png'),
    rating: 5,
    area: 100,
    population: 5723,
  },
  {
    id: 7,
    name: 'Vardø',
    county: 'Troms og Finnmark',
    weaponImg: require('../../assets/sande.svg.png'),
    rating: 5,
    area: 103,
    population: 512,
  },
  {
    id: 8,
    name: 'Oslo',
    county: 'Oslo',
    weaponImg: require('../../assets/vardo.svg.png'),
    rating: 1,
    area: 100,
    population: 1505005,
  },
];

export default function MainPage() {
  // globals states from Redux
  const kommune = useAppSelector((state) => state.kommuneInput.kommune);
  const county = useAppSelector((state) => state.countyInput.county);
  const filter = useAppSelector((state) => state.filterInput.filter);
  // store kommuner from backend here
  // const [kommuner, setKommuner] = useState<any>([]);

  useEffect(() => {
    console.log(kommune, county, filter);
  }, [kommune, county, filter]);

  return (
    <div className='mainPage'>
      <Search />
      <InputFields />
      <div className='cards'>
        <SimpleGrid
          breakpoints={[
            { minWidth: 0, cols: 1 },
            { minWidth: 600, cols: 2 },
            { minWidth: 900, cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}>
          {/* replace type any when fetching kommuner from backend */}
          {dummy.map((k: any) => {
            return (
              <KommuneCard
                key={k.id}
                name={k.name}
                county={k.county}
                weaponImg={k.weaponImg}
                rating={k.rating}
              />
            );
          })}
        </SimpleGrid>
      </div>
    </div>
  );
}
