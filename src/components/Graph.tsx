import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const Styles: { [key: string]: React.CSSProperties } = {
  graph: {
    padding: '12px',
  },
};

interface Props {
  population: { prefName: string; data: { year: number; value: number }[] }[];
}

const Graph: React.FC<Props> = ({ population }) => {
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories = [];

  for (let p of population) {
    let data = [];

    for (let pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }
    series.push({
      type: 'line',
      name: p.prefName,
      data: data,
    });
  }

  const options: Highcharts.Options = {
    title: {
      text: '総人口推移',
    },
    xAxis: {
      title: {
        text: '年度',
      },
    },
    yAxis: {
      title: {
        text: '人口数',
      },
      categories: categories,
    },
    series: series.length === 0 ? [{ type: 'line', name: '都道府県名', data: [] }] : series,
  };

  return (
    <div style={Styles.graph}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;
