import './InputFields.css';
import { Select } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateCounty } from '../../redux/countyReducer';
import { updateFilter } from '../../redux/filterReducer';
import { GET_ALL_COUNTIES } from '../../services/countyService';
import { useQuery } from '@apollo/client';

export default function InputFields() {
  const county = useAppSelector((state) => state.countyInput.county);
  const filter = useAppSelector((state) => state.filterInput.filter);
  const dispatch = useAppDispatch();

  const changeCounty = (county: string) => {
    dispatch(updateCounty(county));
  };
  const changeFilter = (filter: string) => {
    dispatch(updateFilter(filter));
  };

  const { error, data } = useQuery(GET_ALL_COUNTIES);
  if (error) {
    console.log(error);
  }

  return (
    <div className='inputFields'>
      <div className='dropdown'>
        {data?.counties ? (
          <Select
            defaultValue={county}
            label='Filtrer på fylke'
            data={data.counties
              .map(
                (county: { name: string; __typename: string; _id: string }) =>
                  county.name
              )
              .sort()}
            searchable
            clearable
            onChange={changeCounty}
            dropdownPosition='bottom'
          />
        ) : (
          <div>No counties</div>
        )}
        <Select
          defaultValue={filter}
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
