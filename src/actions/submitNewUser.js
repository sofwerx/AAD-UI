export const submitNewUser = (object) => dispatch => {
    const options = {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
        "Content-Type": "application/json"
        },
        credentials: 'include',
        crossDomain: true
    }
    fetch('http://localhost:3000/signup', options)
    .then(json => {
        console.log('SIGNUP RESPONSE ', json)
        if(json.status === 200) {
            return dispatch({ type:'SIGNUP_SUCCESS' })
        } else {
            return dispatch({ type:'SIGNUP_FAILED' })
        }
    })
    .catch(err => {
        console.log('ERROR WITH SIGNUP REQUEST', err)
        return dispatch({ type:'SIGNUP_FAILED' })
    })    
  }