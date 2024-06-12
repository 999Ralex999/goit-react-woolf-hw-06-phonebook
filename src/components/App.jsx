import { useState, useEffect, useCallback, useMemo } from 'react';
import { ContactForm } from './contact_form/contact_form';
import { Filter } from './contact_filter/contact_filter';
import { ContactList } from './contacts/contact_list/contact_list';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsString = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsString);
  }, [contacts]);

  const fillContacts = useCallback(
    contact => {
      if (
        contacts.find(
          item => item.name.toLowerCase() === contact.name.toLowerCase()
        )
      ) {
        alert(`${contact.name} is already in contacts`);
        return;
      }
      setContacts(prevState => [...prevState, contact]);
    },
    [contacts]
  );

  const onChangeFilter = useCallback(e => {
    setFilter(e.target.value);
  }, []);

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  const deleteContact = useCallback(contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
        backgroundColor: '#f0f0f0',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm fillContacts={fillContacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};
