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
  },
  {
    id: 2,
    kommune: 'Berlevåg',
    county: 'Troms og Finnmark',
    weapon: require('../../assets/berlevag.svg.png'),
  },
  {
    id: 3,
    kommune: 'Vardø',
    county: 'Troms og Finnmark',
    weapon: require('../../assets/sande.svg.png'),
  },
  {
    id: 4,
    kommune: 'Sande',
    county: 'Møre og Romsdal',
    weapon: require('../../assets/vardo.svg.png'),
  },
  {
    id: 5,
    kommune: 'Lier',
    county: 'Viken',
    weapon: require('../../assets/lier.svg.png'),
  },
  {
    id: 6,
    kommune: 'Berlevåg',
    county: 'Troms og Finnmark',
    weapon: require('../../assets/berlevag.svg.png'),
  },
  {
    id: 7,
    kommune: 'Vardø',
    county: 'Troms og Finnmark',
    weapon: require('../../assets/sande.svg.png'),
  },
  {
    id: 8,
    kommune: 'Sande',
    county: 'Møre og Romsdal',
    weapon: require('../../assets/vardo.svg.png'),
  },
];

export default function MainPage() {
  const [search, setSearch] = useState<string>('');
  const [countys, setCountys] = useState<string[]>([]);
  const [sort, setSort] = useState<string>('');
  const [parameters, setParameters] = useState<{ county: string, sort: string }>({
    county: "",
    sort: "",
  });

  console.log(parameters);
  console.log(search);

  return (
    <div>
      <Search
        setSearch={setSearch}
        search={search}
      ></Search>
      <InputFields
        parameters={parameters}
        setParameters={setParameters}
        countys={countys}
        setCountys={setCountys}
        setSort={setSort}
        sort={sort}
      ></InputFields>
      <div className='cards'>
        <SimpleGrid
          breakpoints={[
            { minWidth: 0, cols: 1 },
            { minWidth: 800, cols: 2 },
            { minWidth: 1200, cols: 3 },
            { minWidth: 1600, cols: 4 },
          ]}>
          {kommuner.map((kommune) => {
            return (
              <KommuneCard
                key={kommune.id}
                kommune={kommune.kommune}
                county={kommune.county}
                weapon={kommune.weapon}
              />
            );
          })}
        </SimpleGrid>
      </div>
    </div >
  );
}
