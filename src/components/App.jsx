// Встановлення через термінал генератора id
// $ npm install --save nanoid

import { nanoid } from 'nanoid'; // підключення генератора id
import {Component} from 'react';
import {ContactForm} from "./Form/ContactForm";
import {ContactsList} from "./ContactsList/ContactsList";
import {Filter} from "./Filter/Filter";
import css from "./App.module.css"; // підключення стилів

// const CONTACTS = 'contacts'; // ключ для localStorage

export class App extends Component {

// ДАННІ - Ввідні данні по ТЗ 
state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
}

componentDidMount() {
  const contactsStorage =  localStorage.getItem ('contacts');

  if (contactsStorage !== null) {
    const contactslist = JSON.parse(contactsStorage);
    this.setState({contacts: contactslist})
  } 
  
}


componentDidUpdate(_, prevState) {
    localStorage.setItem( 'contacts', JSON.stringify(this.state.contacts)); // перетворюємо масив в JSON
}

// INPUT - зберігаємо данні при вводі текста в input
handleChange = (event) => {
      const {name, value} = event.currentTarget;
      this.setState({[name]: value});
    }

// ADD CONTACT - додаємо контакт до масиву
addContact = ({ name, number }) => {
    let newId = 'id-' + nanoid(3); // генеруємо id
    let list = this.state.contacts; // беремо данны масиву

    // ПЕРЕВІРКА - чи такий контакт вже існує
    if (list.some(value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase())){
      alert(`"${name}" is already in contacts`); // повідомлення, що такий контакт вже існує
    } else {
      list.push({id:newId, name: name, number: number}); // додаємо до масиву данних
      return this.setState({contacts: list}); // ререндиримо сторінку
    }
  }



// DELETE - видаляємо контакт з масиву
onClickDelete = e => {
  e.preventDefault(); // Зупиняємо оновлення сторінки
  const id = e.currentTarget.id;
  const filtred = this.state.contacts.filter(item => item.id !== id); // Новий масив, який містить всі контакти, окрім того, що має ідентифікатор
  this.setState({ contacts: filtred });
}

// FILTER - фільтруємо введені данні 
filter = () => {
  const { contacts, filter } = this.state;

  // новий масив, який містить всі контакти, що містять рядок пошуку
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return filteredContacts;  // повернення нового масиву
}

// РЕНДНЕРІНГ сторінки
  render () {
      const { filter } = this.state;

      return (
      <div className={css.container}>
        <h1 className={css.section_title}>Phonebook</h1>
        <ContactForm addContact={this.addContact}/>

        <h2 className={css.section_title}>Contacts</h2>
        <Filter  filter={filter} handleChange={this.handleChange}/>
        <ContactsList onClickDelete={this.onClickDelete} contacts={this.filter()}></ContactsList>
      </div>
  );}
  
};


