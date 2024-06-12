import css from './contact_form.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const ContactForm = ({ fillContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errors, setErrors] = useState({ name: '', number: '' });

  const namePattern = new RegExp(
    "^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ]?[a-zA-Zа-яА-Я]*)*$"
  );
  const numberPattern = new RegExp(
    '\\+?\\d{1,4}?([-\\.\\s]?\\(?\\d{1,3}\\)?[-\\.\\s]?\\d{1,4}[-\\.\\s]?\\d{1,4}[-\\.\\s]?\\d{1,9})?'
  );

  const setOptions = {
    name: setName,
    number: setNumber,
  };

  const validateField = (name, value) => {
    let pattern;
    let errorMessage = '';

    if (name === 'name') {
      pattern = namePattern;
      if (!pattern.test(value)) {
        errorMessage = 'Invalid name format.';
      }
    } else if (name === 'number') {
      pattern = numberPattern;
      if (!pattern.test(value)) {
        errorMessage = 'Invalid number format.';
      }
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    return errorMessage === '';
  };

  const onChange = e => {
    const { name, value } = e.target;
    if (validateField(name, value)) {
      setOptions[name](value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const isNameValid = validateField('name', name);
    const isNumberValid = validateField('number', number);

    if (isNameValid && isNumberValid) {
      const contact = {
        id: nanoid(),
        name: name.trim(),
        number: number,
      };
      fillContacts(contact);

      setName('');
      setNumber('');
    }
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
        {errors.name && <span className={css.error}>{errors.name}</span>}
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
        {errors.number && <span className={css.error}>{errors.number}</span>}
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
