import React from 'react';

function User(props: { imageHeight: any; }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: "flex-start",
        height: props.imageHeight,
      }}
    >

    </div>
  )
}

export default User
