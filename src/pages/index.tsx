import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import CheckBox from '@/components/CheckBox';
import axios from 'axios';

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
    .get(
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
      String(prefCode),
    {
      headers: { "X-API-KEY": process.env.MY_APP_API_KEY},
    }
  };
  return (
    <div style={Body}>
      <CheckBox prefectures={prefectures} onChange={handler}></CheckBox>
    </div>
  );
};

export default Home;

const BodyStyle: React.CSSProperties = {
  backgroundColor: 'white',
};
