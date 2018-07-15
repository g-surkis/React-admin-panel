import React from 'react';

const date = new Date();
export default props => {
  return (
    <div>
      <p className="copyrigth">&copy; {date.getFullYear()}</p>
    </div>
  );
};
