import './Search.css';
import { ActionIcon, Select } from '@mantine/core';
import { SearchProps } from '../../types/propTypes';

const dummyKommuner = [
  'Lier',
  'Berlevåg',
  'Vardø',
  'Sande',
  'Trondheim',
  'Oslo',
  'Stavanger',
];

export default function Search({ setSearch, search }: SearchProps) {
  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <div className='search'>
      <Select
        label='Søk etter kommune'
        searchable
        clearable
        rightSectionWidth={42}
        dropdownPosition='bottom'
        data={dummyKommuner}
        onChange={updateSearch}
        rightSection={
          <ActionIcon
            size={32}
            radius='md'>
            <img
              className='searchIcon'
              src={require('../../assets/search.png')}
              alt=''
            />
          </ActionIcon>
        }
      />
    </div>
  );
}
