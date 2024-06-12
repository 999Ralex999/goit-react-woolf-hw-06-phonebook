import css from './contact_form.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../store/contacts/slice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const setOptions = {
    name: setName,
    number: setNumber,
  };

  const onChange = e => {
    const { name, value } = e.target;

    let pattern;
    if (name === 'name') {
      pattern = new RegExp(
        "^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ]?[a-zA-Zа-яА-Я]*)*$"
      );
    } else if (name === 'number') {
      pattern =
        '\\+?\\d{1,4}?([-\\.\\s]?\\(?\\d{1,3}\\)?[-\\.\\s]?\\d{1,4}[-\\.\\s]?\\d{1,4}[-\\.\\s]?\\d{1,9})?';
    }

    if (!value || !pattern || value.match(pattern)) {
      setOptions[name](value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name: name.trim(),
      number: number,
    };
    dispatch(addContact(contact));

    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChange}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onChange}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
