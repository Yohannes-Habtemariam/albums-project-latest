import React from 'react';

const Deregister = (props) => {
  return (
    <div>
      <button onClick={props.deregister} className='logout-btn'>Delete User</button>
    </div>
  )
}

export default Deregister;
