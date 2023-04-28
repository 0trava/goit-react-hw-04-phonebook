import PropTypes from 'prop-types';
import css from "./Filter.module.css"; // підключення стилів на картку

export const Filter = ({handleChange, filter}) => {

    return (
      <div className={css.form__filter}>
          <label htmlFor="Find">Find contacts by name</label>
          <input
          value={filter}
          onChange={handleChange}
          className={css.filter__input}
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          />
      </div>

    );
  }
  

Filter.propTypes = {
  filter: PropTypes.string.isRequired, // рядок
  handleChange: PropTypes.func.isRequired // функція
};
