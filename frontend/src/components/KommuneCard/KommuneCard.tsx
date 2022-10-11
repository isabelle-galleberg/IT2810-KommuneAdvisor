import { createStyles, Card, Image, Text, Group, Button } from '@mantine/core';
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
  kommune,
  county,
  weapon,
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
          src={weapon}
          height={130}
          width={100}
        />
        <div className={classes.body}>
          <Text
            mt='xs'
            mb='xs'
            weight='700'
            size='md'>
            {kommune}
          </Text>
          <Text
            size='sm'
            color='dimmed'>
            📍{county}
          </Text>
          <Button
            variant='light'
            color='blue'
            mt='xs'
            radius='md'>
            Vis mer
          </Button>
        </div>
      </Group>
    </Card>
  );
}
