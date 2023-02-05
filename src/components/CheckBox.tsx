import React from 'react';

interface Props {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];
  onChange: (prefName: string, prefCpde: number, check: boolean) => void;
}
const Styles: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '10px',
  justifyContent: 'flex-start',
  justifySelf: 'auto',
};
const PrefStyles: React.CSSProperties = {
  padding: '13px',
};

const CheckBox: React.FC<Props> = ({ prefectures, onChange }) => {
  return (
    <div style={Styles}>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode} style={PrefStyles}>
          <input
            type='checkbox'
            onChange={(event) => onChange(prefecture.prefName, prefecture.prefCode, event.target.checked)}
          ></input>
          <label>{prefecture.prefName}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
