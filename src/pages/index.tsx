import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CheckBox from '@/components/CheckBox';
import Graph from '@/components/Graph';
import axios from 'axios';
import { useState, useEffect } from 'react';

// const prefectures = [
//   {
//     prefCode: 1,
//     prefName: '北海道',
//   },
//   {
//     prefCode: 2,
//     prefName: '青森県',
//   },
//   {
//     prefCode: 3,
//     prefName: '岩手県',
//   },
//   {
//     prefCode: 4,
//     prefName: '宮城県',
//   },
//   {
//     prefCode: 5,
//     prefName: '秋田県',
//   },
//   {
//     prefCode: 6,
//     prefName: '山形県',
//   },
//   {
//     prefCode: 7,
//     prefName: '福島県',
//   },
//   {
//     prefCode: 8,
//     prefName: '茨城県',
//   },
//   {
//     prefCode: 9,
//     prefName: '栃木県',
//   },
//   {
//     prefCode: 10,
//     prefName: '群馬県',
//   },
//   {
//     prefCode: 11,
//     prefName: '埼玉県',
//   },
//   {
//     prefCode: 12,
//     prefName: '千葉県',
//   },
//   {
//     prefCode: 13,
//     prefName: '東京都',
//   },
//   {
//     prefCode: 14,
//     prefName: '神奈川県',
//   },
//   {
//     prefCode: 15,
//     prefName: '新潟県',
//   },
//   {
//     prefCode: 16,
//     prefName: '富山県',
//   },
//   {
//     prefCode: 17,
//     prefName: '石川県',
//   },
//   {
//     prefCode: 18,
//     prefName: '福井県',
//   },
//   {
//     prefCode: 19,
//     prefName: '山梨県',
//   },
//   {
//     prefCode: 20,
//     prefName: '長野県',
//   },
//   {
//     prefCode: 21,
//     prefName: '岐阜県',
//   },
//   {
//     prefCode: 22,
//     prefName: '静岡県',
//   },
//   {
//     prefCode: 23,
//     prefName: '愛知県',
//   },
//   {
//     prefCode: 24,
//     prefName: '三重県',
//   },
//   {
//     prefCode: 25,
//     prefName: '滋賀県',
//   },
//   {
//     prefCode: 26,
//     prefName: '京都府',
//   },
//   {
//     prefCode: 27,
//     prefName: '大阪府',
//   },
//   {
//     prefCode: 28,
//     prefName: '兵庫県',
//   },
//   {
//     prefCode: 29,
//     prefName: '奈良県',
//   },
//   {
//     prefCode: 30,
//     prefName: '和歌山県',
//   },
//   {
//     prefCode: 31,
//     prefName: '鳥取県',
//   },
//   {
//     prefCode: 32,
//     prefName: '島根県',
//   },
//   {
//     prefCode: 33,
//     prefName: '岡山県',
//   },
//   {
//     prefCode: 34,
//     prefName: '広島県',
//   },
//   {
//     prefCode: 35,
//     prefName: '山口県',
//   },
//   {
//     prefCode: 36,
//     prefName: '徳島県',
//   },
//   {
//     prefCode: 37,
//     prefName: '香川県',
//   },
//   {
//     prefCode: 38,
//     prefName: '愛媛県',
//   },
//   {
//     prefCode: 39,
//     prefName: '高知県',
//   },
//   {
//     prefCode: 40,
//     prefName: '福岡県',
//   },
//   {
//     prefCode: 41,
//     prefName: '佐賀県',
//   },
//   {
//     prefCode: 42,
//     prefName: '長崎県',
//   },
//   {
//     prefCode: 43,
//     prefName: '熊本県',
//   },
//   {
//     prefCode: 44,
//     prefName: '大分県',
//   },
//   {
//     prefCode: 45,
//     prefName: '宮崎県',
//   },
//   {
//     prefCode: 46,
//     prefName: '鹿児島県',
//   },
//   {
//     prefCode: 47,
//     prefName: '沖縄県',
//   },
// ];

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
          console.log('成功', res);
          c_prefPopulation.push({
            prefName: prefName,
            data: res.data.result.data[0].data,
          });
          setPrefPopulation(c_prefPopulation);
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
        <h1>都道府県</h1>
        {prefectures && <CheckBox prefectures={prefectures.result} onChange={handler} />}
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
