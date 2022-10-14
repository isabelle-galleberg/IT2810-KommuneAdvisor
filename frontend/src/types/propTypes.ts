export interface KommuneCardProps {
  kommune: string;
  county: string;
  weapon: string;
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
  rating: number;
  title: string;
  text: string;
  author: string;
}
export interface SearchProps {
  setSearch: (search: string) => void;
  search: string;
}
