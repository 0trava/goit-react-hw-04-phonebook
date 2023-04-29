import PropTypes from 'prop-types';
import css from "./ContactForm.module.css"; // підключення стилів на картку
import {useState} from 'react'; // пакети для роботи зі станом

export const ContactForm =({addContact})=> {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


    // INPUT - зберігаємо данні при вводі текста 
    const handleChange = (event) => {
      const {name, value} = event.currentTarget;
      if (name === "name") {setName(value);}
      if (name === "number") {setNumber(value);}
    };

    // РЕНДНЕРІНГ секції 
      return (
        <>
        <form className={css.form} 
                  onSubmit={evt => {
                    evt.preventDefault(); // відміна перезавантаження сторінки
                    addContact({ name, number }); // Передача стану компонента до addContact як (props) з батьківського компоненту.
                    setName("") // очищення вмісту форми
                    setNumber(""); // очищення вмісту форми
                  }}>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={handleChange}
          className={css.form__input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required/>
        <label htmlFor="number">Number</label>
        <input
          value={number}
          onChange={handleChange}
          className={css.form__input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button className={css.form__btn} type="submit">Add contact</button>
        </form>
        </>
        
    ); }

  
  ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired, // функція
  }