import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

interface Props {
  graphData: {};
}
const Graph: React.FC<Props> = ({ graphData }) => {
  return <HighchartsReact highCharts={Highcharts} option={graphData}></HighchartsReact>;
};

export default Graph;
