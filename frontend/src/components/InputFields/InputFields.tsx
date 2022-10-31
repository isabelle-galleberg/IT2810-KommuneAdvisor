import './InputFields.css';
import { Select } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateCounty } from '../../redux/countyReducer';
import { updateFilter } from '../../redux/filterReducer';
import { GET_ALL_COUNTIES } from '../../services/countyService';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

export default function InputFields() {
  const county = useAppSelector((state) => state.countyInput.county);
  const sortBy = useAppSelector((state) => state.filterInput.sortBy);
  const sortDirection = useAppSelector(
    (state) => state.filterInput.sortDirection
  );
  const dispatch = useAppDispatch();

  const changeCounty = (county: string) => {
    dispatch(updateCounty(county));
  };
  const changeFilter = (filter: string) => {
    dispatch(updateFilter(filter));
  };

  // get counties from GraphQL
  const { error, data } = useQuery(GET_ALL_COUNTIES);
  if (error) {
    console.log(error);
  }

  const getDefaultFilterValue = useMemo(() => {
    if (sortBy == 'population' && sortDirection == 'descending')
      return 'Befolkning høy-lav';
    if (sortBy == 'population' && sortDirection == 'ascending')
      return 'Befolkning lav-høy';
    if (sortBy == 'area' && sortDirection == 'descending')
      return 'Areal høy-lav';
    if (sortBy == 'area' && sortDirection == 'ascending')
      return 'Areal lav-høy';
    if (sortBy == 'rating' && sortDirection == 'descending')
      return 'Rangering høy-lav';
    if (sortBy == 'rating' && sortDirection == 'ascending')
      return 'Rangering lav-høy';
    else return '';
  }, [sortBy, sortDirection]);

  // counties sorted alphabetically, with value of countyId
  const counties = data?.counties
    .map((county: { name: string; __typename: string; _id: string }) => {
      return { label: county.name, value: county._id };
    })
    .sort((a: { label: string }, b: { label: string }) =>
      a.label > b.label ? 1 : -1
    );

  return (
    <div className='inputFields'>
      <div className='dropdown'>
        {data?.counties ? (
          <Select
            defaultValue={county}
            label='Filtrer på fylke'
            data={counties}
            searchable
            clearable
            onChange={changeCounty}
            dropdownPosition='bottom'
          />
        ) : null}
        <Select
          defaultValue={getDefaultFilterValue}
          label='Sorter'
          data={[
            'Areal høy-lav',
            'Areal lav-høy',
            'Befolkning høy-lav',
            'Befolkning lav-høy',
            'Rangering høy-lav',
            'Rangering lav-høy',
          ]}
          clearable
          onChange={changeFilter}
          dropdownPosition='bottom'
        />
      </div>
    </div>
  );
}
