export interface KommuneCardProps {
  name: string;
  county: string;
  weaponImg: string;
}

export interface InputFieldsProps {
  setParameters: (parameters: { county: string; sort: string }) => void;
  parameters: { county: string; sort: string };
  setCountys: (countys: string[]) => void;
  countys: string[];
  setSort: (sort: string) => void;
  sort: string;
}
export interface ReviewCardProps {
  title: string;
  description: string;
  rating: number;
  name: string;
  date: string;
}
export interface SearchProps {
  setSearch: (search: string) => void;
  search: string;
}
