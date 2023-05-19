import classNames from 'classnames';
import type { Filter, SelectedFilter } from '../types';

const Filters = ({
  filterList,
  selectedFilter,
}: {
  filterList: Filter[];
  selectedFilter: SelectedFilter;
}) => {
  const buttonClasses = classNames('border-2 rounded border-[#fff] px-[32px]');
  return (
    <div className="flex gap-[16px]">
      {filterList.map(({ label, onClick }) => (
        <button
          key={label}
          aria-label={`Show ${label}`}
          onClick={onClick}
          className={classNames(buttonClasses, {
            'bg-[#fff] text-[#1e1a25] font-bold': selectedFilter === label,
          })}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Filters;
