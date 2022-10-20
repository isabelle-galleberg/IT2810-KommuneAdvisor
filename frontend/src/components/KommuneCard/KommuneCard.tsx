import { Card, Image, Text, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { KommuneCardProps } from '../../types/propTypes';
import './KommuneCard.css';

export default function KommuneCard({
  name,
  county,
  weaponImg,
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
      </Group>
    </Card>
  );
}
