import css from './SearchBar.module.css';

import { Formik, Form, Field } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
// react icons
import { CiSearch } from 'react-icons/ci';

// initialValues
const initialValues = {
  query: '',
};

const SearchBar = ({ onSetSearchQuery }) => {
  // Callback function for Submit
  const handlerSubmit = (values, actions) => {
    if (!values.query.trim()) {
      toast('Please enter your request.');
      return;
    }
    onSetSearchQuery(values.query);
    actions.resetForm();
  };

  return (
    <header className={css.searchBar}>
      <Formik initialValues={initialValues} onSubmit={handlerSubmit}>
        <Form className={css.searchBarForm} autocomlete="off">
          <Field
            className={css.searchBarField}
            name="query"
            type="text"
            autocomlete="off"
            placeholder="Search images and photos"
          />
          <div>
            {/* <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'rgba(157, 222, 255, 0.9)',
                  color: '#000',
                },
              }}
            /> */}
          </div>
          <button className={css.searchBarBtn} type="submit">
            <CiSearch size="22" />
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
