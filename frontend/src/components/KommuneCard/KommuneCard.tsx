import { Card, Image, Text, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { KommuneCardProps } from '../../types/propTypes';
import { Rating } from 'react-simple-star-rating';
import './KommuneCard.css';

export default function KommuneCard({
  name,
  county,
  weaponImg,
  rating
}: KommuneCardProps) {
  return (
    <Card
      withBorder
      className='kommuneCard'>
      <Group
        noWrap
        spacing={20}>
        <Image
          src={weaponImg}
          height={90}
          width={70}
        />
        <div>
          <Text
            mt='xs'
            mb='xs'
            weight='700'
            size='md'>
            {name}
          </Text>
          <Text
            size='sm'
            color='dimmed'>
            📍{county}
          </Text>
          <Link to={`kommune/${name.replace(' ', '_')}`}>
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
          <Rating size={20} iconsCount={1} readonly initialValue={1}></Rating>
          <p className='averageRating'>({rating})</p>
        </div>
      </Group>
    </Card >
  );
}
