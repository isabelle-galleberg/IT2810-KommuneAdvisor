import './MainPage.css';
import KommuneCard from '../../components/KommuneCard/KommuneCard';
import { SimpleGrid, TextInput } from '@mantine/core';
import InputFields from '../../components/InputFields/InputFields';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useQuery } from '@apollo/client';
import {
  GET_ALL_KOMMUNER,
  GET_KOMMUNER_COUNT,
} from '../../services/kommuneService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useEffect, useMemo, useState } from 'react';
import { updateKommune } from '../../redux/kommuneReducer';
import { IconSearch } from '@tabler/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function MainPage() {
  // globals states from Redux
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.kommuneInput.kommune);
  const county = useAppSelector((state) => state.countyInput.county);
  const filter = useAppSelector((state) => state.filterInput.filter);

  // sorting values for GraphQL query
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending');

  const [kommuner, setKommuner] = useState([] as any[]);
  const [page, setPage] = useState(1);

  const { data: countResponse, refetch: refetchKommuneCount } = useQuery(
    GET_KOMMUNER_COUNT,
    { variables: { search: searchInput, county: county } }
  );

  const {
    loading,
    error,
    data: kommuneResponse,
    refetch: refetchKommuner,
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

  const hasMorePages = useMemo(() => {
    if (countResponse && kommuneResponse) {
      return kommuner.length < (countResponse?.kommunerCount ?? 0);
    }
    return false;
  }, [kommuner, countResponse]);

  // create separate function for filtering
  useEffect(() => {
    if (!filter) return;

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

  useEffect(() => {
    if (!countResponse) return;

    refetchKommuner();
  }, [countResponse]);

  useEffect(() => {
    refetchKommuner();
  }, [page]);

  useEffect(() => {
    setKommuner([]);

    setPage(1);
    refetchKommuneCount();
  }, [searchInput, county, filter]);

  useEffect(() => {
    if (kommuneResponse) {
      setKommuner([...kommuner, ...kommuneResponse.kommuner]);
    }
  }, [kommuneResponse]);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateKommune(e.target.value));
    setKommuner([]);
  };

  const nextPage = () => {
    setPage((page) => page + 1);
  };
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

      {countResponse?.kommunerCount && true && (
        <div className='cards'>
          <InfiniteScroll
            dataLength={kommuner.length}
            next={nextPage}
            hasMore={hasMorePages}
            loader={null}>
            <SimpleGrid
              breakpoints={[
                { minWidth: 0, cols: 1 },
                { minWidth: 600, cols: 2 },
                { minWidth: 900, cols: 3 },
                { minWidth: 1200, cols: 4 },
              ]}>
              {loading && <LoadingSpinner />}
              {/* Replace type any! */}
              {kommuner &&
                kommuner.map((kommune: any) => {
                  return (
                    <KommuneCard
                      key={kommune._id}
                      id={kommune._id}
                      name={kommune.name}
                      weaponImg={kommune.logoUrl}
                      county={kommune.county?.name ?? ''}
                      rating={kommune.averageRating}
                    />
                  );
                })}
            </SimpleGrid>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
