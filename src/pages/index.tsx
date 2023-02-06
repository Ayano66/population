import CheckBox from '@/components/CheckBox';
import Graph from '@/components/Graph';
import Header from '@/components/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Home: React.FC = () => {
  const [prefectures, setPreFectures] = useState<{
    // message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);

  const [prefPopulation, setPrefPopulation] = useState<{ prefName: string; data: { year: number; value: number }[] }[]>(
    [],
  );

  useEffect(() => {
    // 都道府県一覧を取得する
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': 'XpIkOhd50epNBliBNsaWA0Gu94G8gdauDHqSjbcE' },
      })
      .then((results) => {
        setPreFectures(results.data);
      })
      .catch((error) => {});
  }, []);

  const handler = (prefName: string, prefCode: number, check: boolean) => {
    let c_prefPopulation = prefPopulation.slice();
    if (check) {
      axios
        .get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=' + String(prefCode), {
          headers: { 'X-API-KEY': 'XpIkOhd50epNBliBNsaWA0Gu94G8gdauDHqSjbcE' },
        })
        .then((res) => {
          c_prefPopulation.push({
            prefName: prefName,
            data: res.data.result.data[0].data,
          });
          setPrefPopulation(c_prefPopulation);
          // console.log('成功', res);
        })
        .catch((error) => {
          return;
          // console.log(error.message);
        });
    } else {
      const deleteIndex = c_prefPopulation.findIndex((value) => value.prefName === prefName);
      c_prefPopulation.splice(deleteIndex, 1);
      setPrefPopulation(c_prefPopulation);
      // console.log('キャンセル' + prefCode + prefName);
    }
  };
  return (
    <>
      <div style={BodyStyle}>
        <Header />
        <div>{prefectures && <CheckBox prefectures={prefectures.result} onChange={handler} />}</div>
      </div>
      <div>
        <h2>人口推移グラフ</h2>
        <Graph population={prefPopulation}></Graph>
      </div>
    </>
  );
};

export default Home;

const BodyStyle: React.CSSProperties = {
  backgroundColor: 'white',
};
