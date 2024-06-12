import css from './contact_item.module.css';

export const ContactItem = ({ contact, deleteContact }) => {
  return (
    <li className={css.item}>
      <span>
        {contact.name}: {contact.number}
      </span>
      <button
        className={css.btnDelete}
        type="button"
        onClick={() => deleteContact(contact.id)}
      >
        delete
      </button>
    </li>
  );
};
