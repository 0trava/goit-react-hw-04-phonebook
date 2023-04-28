import PropTypes from 'prop-types';
import css from "./ContactForm.module.css"; // підключення стилів на картку
import { Component } from 'react'; // імпорт базового класу React Component

export class ContactForm extends Component {

    state = {
      name: '',
      number: '',
    };


    // INPUT - зберігаємо данні при вводі текста 
    handleChange = (event) => {
      const {name, value} = event.currentTarget;
      this.setState({[name]: value});
    }

    // РЕНДНЕРІНГ секції 
    render() {
      return (
        <>
        <form className={css.form} 
                  onSubmit={evt => {
                    evt.preventDefault(); // відміна перезавантаження сторінки
                    this.props.addContact(this.state);// Передача стану компонента до addContact як (props) з батьківського компоненту.
                    this.setState( {name: '', number: ''}); // очищення вмісту форми
                  }}>
        <label htmlFor="name">Name</label>
        <input
          value={this.state.name}
          onChange={this.handleChange}
          className={css.form__input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <input
          value={this.state.number}
          onChange={this.handleChange}
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
    );
    }
    
  }
  
  ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired, // функція
  }