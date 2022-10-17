import { createStyles, Card, Image, Text, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { KommuneCardProps } from '../../types/propTypes';

const useStyles = createStyles(() => ({
  card: {
    width: '265px',
    height: '150px',
  },
}));

export default function KommuneCard({
  name,
  county,
  weaponImg,
}: KommuneCardProps) {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      className={classes.card}>
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
