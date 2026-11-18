function FilterBar({ options, selected, onSelect }) {
  return (
    <div className="filter-bar">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={option === selected ? 'active' : ''}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;