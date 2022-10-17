import { Card, Image, Text, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { KommuneCardProps } from '../../types/propTypes';

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
          height={130}
          width={100}
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
