import './MainPage.css';
import KommuneCard from '../../components/KommuneCard/KommuneCard';
import { Button, Loader, SimpleGrid } from '@mantine/core';
import InputFields from '../../components/InputFields/InputFields';
import Search from '../../components/Search/Search';
import { useAppSelector } from '../../redux/hooks';
import { useQuery } from '@apollo/client';
import { GET_ALL_KOMMUNER, GET_KOMMUNE } from '../../services/kommuneService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';

export default function MainPage() {
  // globals states from Redux
  const kommune = useAppSelector((state) => state.kommuneInput.kommune);
  const county = useAppSelector((state) => state.countyInput.county);
  const filter = useAppSelector((state) => state.filterInput.filter);

  const { loading, error, data } = useQuery(GET_ALL_KOMMUNER, {
    variables: {
      sortBy: 'name',
      sortDirection: 'ascending',
      pageSize: 100,
    },
  });

  // const hei = () => {
  //   if (kommune) {
  //     return GET_KOMMUNE(kommune);
  //   } else {
  //     return GET_ALL_KOMMUNER('name', 'ascending', 50);
  //   }
  // };

  if (loading) return <LoadingSpinner />;
  if (error) console.log(error);

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
          {data && data.kommuner ? (
            data.kommuner.map((k: any) => {
              return (
                <KommuneCard
                  key={k.name}
                  name={k.name}
                  weaponImg={k.logoUrl}
                  county={k.county}
                  rating={0}
                />
              );
            })
          ) : (
            <div>Kommuner not found</div>
          )}
        </SimpleGrid>
      </div>
    </div>
  );
}
