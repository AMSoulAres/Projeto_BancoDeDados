import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function PrefCheckBox({ name }) {
  const [isChecked, setChecked] = useState(false);
  return (
    <div>
      <input
        type="checkbox"
        value={isChecked}
        onChange={() => setChecked((current) => !current)}
        style={{ width: '17px', height: '17px' }}
      />
      <label style={{ color: 'white' }} htmlFor="livroCheckbox">
        {name}
      </label>
    </div>
  );
}

PrefCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
};
