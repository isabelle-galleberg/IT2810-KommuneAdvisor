import './MainPage.css';
import KommuneCard from '../../components/KommuneCard/KommuneCard';
import { Pagination, SimpleGrid, TextInput } from '@mantine/core';
import InputFields from '../../components/InputFields/InputFields';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useQuery } from '@apollo/client';
import {
  GET_ALL_KOMMUNER,
  GET_KOMMUNER_COUNT,
} from '../../services/kommuneService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useEffect, useState } from 'react';
import { updateKommune } from '../../redux/kommuneReducer';
import { IconSearch } from '@tabler/icons';
import { Kommune } from '../../types/kommune';
import { updatePage } from '../../redux/pageReducer';

export default function MainPage() {
  // globals states from Redux
  const searchInput = useAppSelector((state) => state.kommuneInput.kommune);
  const county = useAppSelector((state) => state.countyInput.county);
  const filter = useAppSelector((state) => state.filterInput.filter);
  const page = useAppSelector((state) => state.pageInput.page);
  const dispatch = useAppDispatch();

  // sorting values for GraphQL query
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending');

  // get all kommuner from GraphQL
  const {
    loading: loadingKommuner,
    error: errorKommuner,
    data: dataKommuner,
  } = useQuery(GET_ALL_KOMMUNER, {
    variables: {
      search: searchInput,
      sortBy: sortBy,
      sortDirection: sortDirection,
      pageSize: 24,
      county: county,
      page: page,
    },
  });

  // get number of kommuner from GraphQL
  const {
    loading: loadingCount,
    error: errorCount,
    data: dataCount,
  } = useQuery(GET_KOMMUNER_COUNT, {
    variables: {
      county: county,
      search: searchInput,
    },
  });
  const totalKommuner = dataCount?.kommunerCount;

  useEffect(() => {
    filterKommuner();
  }, [filter]);

  // sort kommuner based on filter value
  const filterKommuner = () => {
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
  };

  // update page on pageination
  const changePage = (page: number) => {
    dispatch(updatePage(page));
  };

  // update kommuner on search and set page to 1
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateKommune(e.target.value));
    changePage(1);
  };

  // error handling
  if (errorKommuner || errorCount) return <div className='error'>Kommuner ikke funnet</div>;

  return (
    <div className='mainPage'>
      <div className='searchField'>
        <TextInput
          label='Søk etter en kommune'
          value={searchInput}
          onChange={changeSearch}
          data-cy='inp-search-kommune'
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
      <div
        className='cards'
        data-cy='kommune-list'>
        <SimpleGrid
          breakpoints={[
            { minWidth: 0, cols: 1 },
            { minWidth: 600, cols: 2 },
            { minWidth: 900, cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}>
          {(loadingKommuner || loadingCount) && <LoadingSpinner />}
          {dataKommuner &&
            dataKommuner.kommuner &&
            dataKommuner.kommuner.map((kommune: Kommune) => {
              return (
                <KommuneCard
                  key={kommune._id}
                  id={kommune._id}
                  name={kommune.name}
                  weaponImg={kommune.logoUrl}
                  county={kommune.county.name}
                  rating={kommune.averageRating}
                />
              );
            })}
        </SimpleGrid>
      </div>
      <Pagination
        className='pagination'
        page={page}
        onChange={changePage}
        total={Math.ceil(totalKommuner / 24)}
      />
    </div>
  );
}
