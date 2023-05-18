import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import { Header, Form, Button, Input, StyledSvg } from './Searchbar.styled';
import { toast } from 'react-toastify';

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handlerSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast("What are you searching for?");
      return;
    };
    onSubmit(value);
    setValue('');
  }

  const onChange = event => {
    setValue(event.currentTarget.value.toLowerCase())
  }

  return (
    <Header>
      <Form onSubmit={handlerSubmit}>
        <Button type="submit">
          <StyledSvg />
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          value={value}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;