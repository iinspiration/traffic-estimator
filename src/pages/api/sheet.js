

import axios from 'axios'
import { get } from 'lodash'
export default async function getSheet(req, res) {
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEEET_ID}/?includeGridData=true&key=${process.env.GOOGLE_API_KEY}`
    console.log("fired url",url)
    axios({
        method: 'get',
        url
    })
    .then(function (response) {
        console.log("fired response",response.data)
        const sheetDataArr = get(response,'data.sheets[0].data[0].rowData',[])
        const dataInRange = sheetDataArr.slice(1)
        const rtnData = dataInRange.map(row=>{
            return {
                title:get(row,'values[0].formattedValue',''),
                location:get(row,'values[1].formattedValue',''),
            }
        })
        return res.status(200).json(rtnData)
    })
    .catch(function (error) {
        console.log(error);
    });
}



