import './Search.css';
import { ActionIcon, Select } from '@mantine/core';
import { updateKommune } from '../../redux/kommuneReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const dummyKommuner = [
  'Lier',
  'Berlevåg',
  'Vardø',
  'Sande',
  'Trondheim',
  'Oslo',
  'Stavanger',
];

export default function Search() {
  const kommune = useAppSelector((state) => state.kommuneInput.kommune);
  const dispatch = useAppDispatch();

  const changeSearch = (search: string) => {
    dispatch(updateKommune(search));
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
        defaultValue={kommune}
        onChange={changeSearch}
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
