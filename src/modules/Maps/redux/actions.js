import axios from 'axios'
export const fetchMeteoriteData = () => {
  // b265fc0e-018b-4de2-94d1-a07b61845559
  return (dispatch) => axios.get(
    'https://data.nasa.gov/resource/gh4g-9sfh.json'
  ).then(res => {
    return dispatch({
      type: 'fetchMeteoriteDataSuccess',
      data: res.data
    })
  }).catch(err => {
    return dispatch({
      type: 'fetchMeteoriteError',
      err: err
    })
  })
}
