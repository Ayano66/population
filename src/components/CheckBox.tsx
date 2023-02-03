import React from 'react';
import prefectures from '@/pages/index';

interface Props {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];
  
}

const CheckBox: React.FC<Props> = ({ prefectures }) => {
  return (
    <div>
      {prefectures.map((prefecture) => (
            <div key={prefecture.prefCode}>
              <input type = "checkbox"></input>
              <label>{prefecture.prefName}</label>
            </div>
          ))}
    </div>
  );
};

export default CheckBox;
