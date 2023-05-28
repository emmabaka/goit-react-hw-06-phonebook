import { useSelector, useDispatch } from 'react-redux';
import { removeContacts } from 'redux/contactsSlice';
import css from './ContactList.module.css';

const ContactList = () => {
  const { data } = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const filterName = useSelector(state => state.filter);

  const visibleContacts = () => {
    return [...data].filter(({ name }) =>
      name.toLowerCase().includes(filterName.toLowerCase())
    );
  };

  return (
    <ul className={css.contactList}>
      {visibleContacts().map(item => {
        return (
          <li key={item.id} className={css.contact}>
            <span className={css.contactItem}> {item.name}:</span>{' '}
            <span>{item.number}</span>
            <button
              className={css.deleteButton}
              onClick={e => dispatch(removeContacts(item.id))}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

