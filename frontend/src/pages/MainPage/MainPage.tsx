import './MainPage.css';
import KommuneCard from '../../components/KommuneCard/KommuneCard';
import { SimpleGrid, TextInput } from '@mantine/core';
import InputFields from '../../components/InputFields/InputFields';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useQuery } from '@apollo/client';
import { GET_ALL_KOMMUNER } from '../../services/kommuneService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useEffect, useState } from 'react';
import { updateKommune } from '../../redux/kommuneReducer';
import { IconSearch } from '@tabler/icons';

export default function MainPage() {
  // globals states from Redux
  const searchInput = useAppSelector((state) => state.kommuneInput.kommune);
  const county = useAppSelector((state) => state.countyInput.county);
  const filter = useAppSelector((state) => state.filterInput.filter);

  // sorting values for GraphQL query
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending');

  // create separate function for filtering
  useEffect(() => {
    switch (filter) {
      case 'Befolkning høy-lav':
        setSortBy('population');
        setSortDirection('descending');
        break;
      case 'Befolkning lav-høy':
        setSortBy('population');
        setSortDirection('ascending');
        break;
      case 'Areal høy-lav':
        setSortBy('area');
        setSortDirection('descending');
        break;
      case 'Areal lav-høy':
        setSortBy('area');
        setSortDirection('ascending');
        break;
      case 'Rangering høy-lav':
        setSortBy('rating');
        setSortDirection('descending');
        break;
      case 'Rangering lav-høy':
        setSortBy('rating');
        setSortDirection('ascending');
        break;
      default:
        setSortBy('name');
        setSortDirection('ascending');
    }
  }, [filter]);

  const { loading, error, data } = useQuery(GET_ALL_KOMMUNER, {
    variables: {
      search: searchInput,
      sortBy: sortBy,
      sortDirection: sortDirection,
      pageSize: 20,
      county: county,
    },
  });

  const dispatch = useAppDispatch();

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateKommune(e.target.value));
  };

  if (error) console.log(error);

  return (
    <div className='mainPage'>
      <div className='searchField'>
        <TextInput
          label='Søk etter en kommune'
          value={searchInput}
          onChange={changeSearch}
          rightSection={
            <IconSearch
              size={18}
              stroke={1.5}
              color='#f3f9fc'
            />
          }
        />
      </div>
      <InputFields />
      <div className='cards'>
        <SimpleGrid
          breakpoints={[
            { minWidth: 0, cols: 1 },
            { minWidth: 600, cols: 2 },
            { minWidth: 900, cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}>
          {loading && <LoadingSpinner />}
          {/* Replace type any! Replace rating with value from backend */}
          {data && data.kommuner ? (
            data.kommuner.map((kommune: any) => {
              return (
                <KommuneCard
                  key={kommune.name}
                  name={kommune.name}
                  weaponImg={kommune.logoUrl}
                  county={kommune.county.name}
                  rating={kommune.averageRating}
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
