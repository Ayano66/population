import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import React from 'react';
import { GetServerSideProps } from 'next';
import CheckBox from '@/components/CheckBox';


export type Props = {
    prefectures: Element[]
  };

const Home: React.FC<Props> = (props) => {
  return (
    <>
      <h1>Test Page</h1>
      <p>
        {props.prefectures};
      </p>
    </>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async () => {
  const URL = 'https://opendata.resas-portal.go.jp/';
  const APIKEY = process.env.X_API_KEY || ""; 

  const res = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures',{headers:{"X-API-KEY": APIKEY}});
  const json = await res.json();
  const prefectures = json.result;


  return {
    props: {prefectures},
  };

};
