export const inviteToSlack = (email) => dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({email}),
    headers: {
    "Content-Type": "application/json"
    },
    credentials: 'include',
    crossDomain: true
}
fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/inviteToSlack', options)
    .then(json => {
    console.log('INVITE_TO_SLACK RESPONSE ', json)
    if(json.status === 200) {
        return dispatch({ type:'INVITE_TO_SLACK_SUCCESS' })
    } else {
        return dispatch({ type:'INVITE_TO_SLACK_FAILED' })
    }
})
.catch(err => {
    console.log('ERROR WITH INVITE_TO_SLACK REQUEST', err)
    return dispatch({ type:'INVITE_TO_SLACK_FAILED' })
})    
}