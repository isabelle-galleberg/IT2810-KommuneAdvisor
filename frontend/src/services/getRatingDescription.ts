
// returns a description based on given rating value
export function getRatingDescription(rating: number): string {
  switch (rating) {
    case 1:
      return 'Forferdelig';
    case 2:
      return 'Dårlig';
    case 3:
      return 'Gjennomsnitt';
    case 4:
      return 'Svært bra';
    case 5:
      return 'Ypperlig';
    default:
      return '';
  }
}
