export type Filter = {
  label: string;
  onClick: () => void;
};

export type SelectedFilter = 'All' | 'Favourites';

export type FavouriteHandler = (
  id: number
) => (event: React.MouseEvent) => void;
