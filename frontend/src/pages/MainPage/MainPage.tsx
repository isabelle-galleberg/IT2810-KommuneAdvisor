import './MainPage.css';
import KommuneCard from '../../components/KommuneCard/KommuneCard';
import { SimpleGrid } from '@mantine/core';
import InputFields from '../../components/InputFields/InputFields';
import { useState } from 'react';
import Search from '../../components/Search/Search';

const kommuner = [
  {
    id: 1,
    kommune: 'Lier',
    county: 'Viken',
    weapon: require('../../assets/lier.svg.png'),
    rating: 3,
  },
  {
    id: 2,
    kommune: 'Berlevåg',
    county: 'Troms og Finnmark',
    weapon: require('../../assets/berlevag.svg.png'),
    rating: 3,
  },
  {
    id: 3,
    kommune: 'Vardø',
    county: 'Troms og Finnmark',
    weapon: require('../../assets/sande.svg.png'),
    rating: 3,
  },
  {
    id: 4,
    kommune: 'Sande',
    county: 'Møre og Romsdal',
    weapon: require('../../assets/vardo.svg.png'),
    rating: 3,
  },
  {
    id: 5,
    kommune: 'Lier',
    county: 'Viken',
    weapon: require('../../assets/lier.svg.png'),
    rating: 3,
  },
  {
    id: 6,
    kommune: 'Berlevåg',
    county: 'Troms og Finnmark',
    weapon: require('../../assets/berlevag.svg.png'),
    rating: 3,
  },
  {
    id: 7,
    kommune: 'Vardø',
    county: 'Troms og Finnmark',
    weapon: require('../../assets/sande.svg.png'),
    rating: 3,
  },
  {
    id: 8,
    kommune: 'Sande',
    county: 'Møre og Romsdal',
    weapon: require('../../assets/vardo.svg.png'),
    rating: 3,
  },
];

export default function MainPage() {
  const [search, setSearch] = useState<string>('');
  const [countys, setCountys] = useState<string[]>([]);
  const [sort, setSort] = useState<string>('');
  const [parameters, setParameters] = useState<{
    county: string;
    sort: string;
  }>({
    county: '',
    sort: '',
  });

  console.log(parameters);
  console.log(search);

  return (
    <div className='mainPage'>
      <Search
        setSearch={setSearch}
        search={search}></Search>
      <InputFields
        parameters={parameters}
        setParameters={setParameters}
        countys={countys}
        setCountys={setCountys}
        setSort={setSort}
        sort={sort}></InputFields>
      <div className='cards'>
        <SimpleGrid
          breakpoints={[
            { minWidth: 0, cols: 1 },
            { minWidth: 600, cols: 2 },
            { minWidth: 900, cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}>
          {kommuner.map((kommune) => {
            return (
              <KommuneCard
                key={kommune.id}
                name={kommune.kommune}
                county={kommune.county}
                weaponImg={kommune.weapon}
                rating={kommune.rating}
              />
            );
          })}
        </SimpleGrid>
      </div>
    </div>
  );
}
