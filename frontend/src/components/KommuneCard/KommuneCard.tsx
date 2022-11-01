import { Card, Image, Text, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { KommuneCardProps } from '../../types/propTypes';
import { Rating } from 'react-simple-star-rating';
import './KommuneCard.css';

export default function KommuneCard({
  id,
  name,
  county,
  weaponImg,
  rating,
}: KommuneCardProps) {
  return (
    <Card
      withBorder
      data-cy='kommune-card'
      className='kommuneCard'>
      <Group
        noWrap
        spacing={15}>
        <Image
          data-cy='kommune-logo'
          src={weaponImg}
          className='weaponImg'
        />
        <div>
          <Text
            data-cy='kommune-name'
            mt='xs'
            mb='xs'
            weight='700'
            size='md'>
            {name}
          </Text>
          <Text
            data-cy='kommune-county'
            size='sm'
            color='dimmed'>
            📍{county}
          </Text>
          <Link
            data-cy='btn-show-details'
            to={`kommune/${id}`}>
            <Button
              variant='light'
              color='blue'
              mt='xs'
              radius='md'>
              Vis mer
            </Button>
          </Link>
        </div>
        <div className='kommuneCardRating'>
          <Rating
            size={20}
            iconsCount={1}
            readonly
            initialValue={1}></Rating>
          <div
            data-cy='kommune-rating'
            className='kommuneCardAverageRating'>
            ({rating != 0 ? rating.toFixed(2) : '-'})
          </div>
        </div>
      </Group>
    </Card>
  );
}
