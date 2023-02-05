import axios from 'axios';

export default function test() {
  axios
    .get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=' + String(10), {
      headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
    })
    .then((res) => {
      const fetchedData = res.data.result.data[0].data;
      console.log('ok');
    })
    .catch((error) => {
      console.log('error');
    });
}
