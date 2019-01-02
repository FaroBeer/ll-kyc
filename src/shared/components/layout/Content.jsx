import React from 'react';
import PropTypes from 'prop-types';

const Content = props => {
  const { children } = props;
  //const { handleChange } = props[1];

  return (
    <main>
      {children}
    </main>
  );
};

Content.propTypes = {
  children: PropTypes.element.isRequired
};

export default Content;
