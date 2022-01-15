

import axios from 'axios'
export default async function estimate(req, res) {
    const { origin="elio%20del%20moss",destination="victory%20monument%20bangkok" } = req.query
    const url = `${process.env.DISTRANCE_MATRIX_API_URL}/json?origins=${origin}&destinations=${destination}&departure_time=now&key=${process.env.GOOGLE_API_KEY}&units=Km&&avoid=toll&mode=driving`
    console.log("fired url",url)
    axios({
        method: 'get',
        url
    })
    .then(function (response) {
        console.log("fired response",response.data)
        return res.status(200).json(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
}



