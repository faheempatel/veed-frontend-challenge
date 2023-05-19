export type Repo = {
  id: number;
  // TODO: add more properties
  [key: string]: any;
};

export type Filter = {
  label: string;
  onClick: (event: React.MouseEvent) => void;
};

export type SelectedFilter = 'All' | 'Favourites';

export type FavouriteHandler = (
  id: number
) => (event: React.MouseEvent) => void;
