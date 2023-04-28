import PropTypes from 'prop-types';
import css from "./ContactsList.module.css"; // підключення стилів на картку



export const ContactsList = ({onClickDelete, contacts}) =>{
    return (
            <ul className={css.contacts__list}>
                {contacts.map(contact => {
                return (<li>
                   <p>{contact.name}</p>
                   <p>{contact.number}</p> 
                   <button onClick={onClickDelete} id = {contact.id} className={css.contacts__btn} type="button">Delete</button>
                </li>)
                })}
            </ul>
    );
  }
  
  ContactsList.prototype = {
    onClickDelete: PropTypes.func.isRequired,// функція
    contacts: PropTypes.func.isRequired,// функція
  };
  

