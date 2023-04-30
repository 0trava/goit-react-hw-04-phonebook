// Встановлення через термінал генератора id
// $ npm install --save nanoid

import { nanoid } from 'nanoid'; // підключення генератора id
import { useState, useEffect } from 'react'; // пакети для роботи зі станом
import {ContactForm} from "./Form/ContactForm";
import {ContactsList} from "./ContactsList/ContactsList";
import {Filter} from "./Filter/Filter";
import css from "./App.module.css"; // підключення стилів

export const App = () => {


  // ДАННІ - для першого завантаження
  const initialContacts = [
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ];

  // ЗМІННІ і ХУКИ
  const CONTACTS = 'contacts'; // ключ для localStorage
  const [filter, setFilter] = useState(''); // Хук для filter
  const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem(CONTACTS)) ?? initialContacts); // якщо в localStorage є контакти, то використовуємо їх, якщо ні, то використовуємо початковий масив


  // componentDidUpdate contacts
  // зберігаємо контакти в localStorage тільки коли змінюється масив контактів
  useEffect(() => {
    window.localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]); 



// INPUT Filter - зберігаємо данні при вводі текста в input
const handleChange = (event) => {
      setFilter(event.currentTarget.value)
    };

// ADD CONTACT - додаємо контакт до масиву
const addContact = ({ name, number }) => {
  let newId = 'id-' + nanoid(3); // генеруємо id

  if (contacts.some(value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
    // якщо є, то виводимо повідомлення
    alert(`${name} is alredy in contacts`); 
  } else {
    // повертаємо новий масив контактів setContacts
    setContacts(old => { const list = [...old];
      list.push({ id: newId, name: name, number: number,});
      return list; 
    });
  }
}

// DELETE - видаляємо контакт з масиву
const onClickDelete = e => {
  e.preventDefault(); // Зупиняємо оновлення сторінки
  const id = e.currentTarget.id;
  const filtred = contacts.filter(item => item.id !== id); // Новий масив, який містить всі контакти, окрім того, що має ідентифікатор
  setContacts(filtred);
}

// FILTER - фільтруємо введені данні 
const filterOn = () => {
  // новий масив, який містить всі контакти, що містять рядок пошуку
  const filteredContacts = contacts.filter(
    contact => contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return filteredContacts;
}


// РЕНДНЕРІНГ сторінки
      return (
      <div className={css.container}>
        <h1 className={css.section_title}>Phonebook</h1>
        <ContactForm addContact={addContact}/>

        <h2 className={css.section_title}>Contacts</h2>
        <Filter  filter={filter} handleChange={handleChange}/>
        <ContactsList onClickDelete={onClickDelete} contacts={filterOn()}></ContactsList>
      </div>
  );};