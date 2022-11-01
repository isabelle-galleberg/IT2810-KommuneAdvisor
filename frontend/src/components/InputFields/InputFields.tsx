import './InputFields.css';
import { Select } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateCounty } from '../../redux/countyReducer';
import { updateFilter } from '../../redux/filterReducer';
import { GET_ALL_COUNTIES } from '../../services/countyService';
import { useQuery } from '@apollo/client';
import { updatePage } from '../../redux/pageReducer';

export default function InputFields() {
  // global states from Redux
  const county = useAppSelector((state) => state.countyInput.county);
  const filter = useAppSelector((state) => state.filterInput.filter);
  const dispatch = useAppDispatch();

  // update county on change and set page to 1
  const changeCounty = (county: string) => {
    dispatch(updateCounty(county));
    dispatch(updatePage(1));
  };

  // update filter on change and set page to 1
  const changeFilter = (filter: string) => {
    dispatch(updateFilter(filter));
    dispatch(updatePage(1));
  };

  // get counties from GraphQL
  const { data } = useQuery(GET_ALL_COUNTIES);

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
            data-cy='inp-filter-county'
          />
        ) : null}
        <Select
          defaultValue={filter}
          data-cy='inp-sort'
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
