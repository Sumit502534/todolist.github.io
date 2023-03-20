import React from 'react'

function Alert(props) {
  const capitailize = (word) =>{
    if(word === 'danger'){
      word = 'Error';
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div className="" style={{height : '40px'}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{capitailize(props.alert.type)}</strong> : {props.alert.msg}
    </div>}
    </div>
  )
}

export default Alert
