import css from './contact_filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/filter/slice';

export const Filter = () => {
  const { filter } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const onChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={onChangeFilter}
      />
    </label>
  );
};
