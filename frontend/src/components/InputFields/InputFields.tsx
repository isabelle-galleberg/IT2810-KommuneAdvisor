import './InputFields.css';
import { Select } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateCounty } from '../../redux/countyReducer';
import { updateFilter } from '../../redux/filterReducer';

const dummyCountys = [
  'Viken',
  'Troms og Finnmark',
  'Møre og Romsdal',
  'Oslo',
  'Trøndelag',
];

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

  // Global state
  console.log(county, filter);

  return (
    <div className='inputFields'>
      <div className='dropdown'>
        <Select
          defaultValue={county}
          label='Filtrer på fylke'
          data={dummyCountys}
          searchable
          clearable
          onChange={changeCounty}
          dropdownPosition='bottom'
        />
        <Select
          defaultValue={filter}
          label='Sorter'
          data={['Alfabetisk', 'Ranking', 'Areal']}
          clearable
          onChange={changeFilter}
          dropdownPosition='bottom'
        />
      </div>
    </div>
  );
}
