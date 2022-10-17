import './InputFields.css';
import { Select } from '@mantine/core';
import { InputFieldsProps } from '../../types/propTypes';

const dummyCountys = [
  'Viken',
  'Troms og Finnmark',
  'Møre og Romsdal',
  'Oslo',
  'Trøndelag',
];

export default function InputFields({
  setParameters,
  parameters,
  setCountys,
  countys,
  setSort,
  sort,
}: InputFieldsProps) {
  const updateCounty = (county: string) => {
    setParameters({ ...parameters, county: county });
  };
  const updateSort = (sort: string) => {
    setParameters({ ...parameters, sort: sort });
  };

  return (
    <div className='inputFields'>
      <div className='dropdown'>
        <Select
          label='Filtrer på fylke'
          data={dummyCountys}
          searchable
          clearable
          onChange={updateCounty}
          dropdownPosition='bottom'
        />
        <Select
          label='Sorter'
          data={['Alfabetisk', 'Ranking', 'Areal']}
          clearable
          onChange={updateSort}
          dropdownPosition='bottom'
        />
      </div>
    </div>
  );
}
