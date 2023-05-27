import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    const contactName = e.target.elements.name.value;
    const contactNumber = e.target.elements.number.value;

    handleSubmit(contactName, contactNumber);
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    if (inputName === 'name') {
      setName(inputValue);
    }
    if (inputName === 'number') {
      setNumber(inputValue);
    }
  };

  return (
    <form onSubmit={onSubmit} className={css.form}>
      <label className={css.label}>
        Name
        <input
          className={css.inputs}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.inputs}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>
      <button className={css.submitButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};
