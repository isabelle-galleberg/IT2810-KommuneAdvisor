import { Review } from './review';

export interface KommuneCardProps {
  id: string;
  name: string;
  county: string;
  weaponImg: string;
  rating: number;
}

export interface AddReviewProps {
  onCreate: (review: Review) => void;
}
