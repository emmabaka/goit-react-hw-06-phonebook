import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      setContacts(contacts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (contactName, contactNumber) => {
    setContacts(prev => {
      const isInclude = prev.some(contact => contact.name === contactName);
      if (isInclude) {
        alert(`${contactName} is already in contacts`);
        return prev;
      } else {
        const newContact = {
          id: nanoid(4),
          name: contactName,
          number: contactNumber,
        };
        const contactArr = [newContact, ...prev];
        return contactArr;
      }
    });
  };

  const handleFilterChange = e => {
    const filterValue = e.target.value;
    setFilter(filterValue);
  };

  const filterByName = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    const filtered = contacts.filter(contact => contact.id !== id);

    setContacts(filtered);
  };

  return (
    <div
      style={{
        height: '100vh',
        margin: '30px',
        display: 'flex',
        flexDirection: 'column',
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} handleChange={handleFilterChange} />
      <ContactList contacts={filterByName()} deleteContact={deleteContact} />
    </div>
  );
};
