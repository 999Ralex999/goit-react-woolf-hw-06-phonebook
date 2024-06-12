import css from './contact_list.module.css';
import { ContactItem } from '../contact/contact_item';
import { useContacts, useFilter } from 'store/selectors';

export const ContactList = () => {
  const contacts = useContacts();
  const filter = useFilter();

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <ul className={css.list}>
      {filteredContacts().map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};
