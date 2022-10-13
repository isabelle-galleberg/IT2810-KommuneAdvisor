import { createStyles, Card, Image, Text, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { KommuneCardProps } from '../../types/propTypes';

const useStyles = createStyles((theme) => ({
  body: {
    padding: theme.spacing.md,
  },
  card: {
    width: '350px',
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
          height={130}
          width={100}
        />
        <div className={classes.body}>
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
