const toastMessage = (state) => {
  return state.getIn(['Toast', 'message'], '')
}

export default toastMessage
