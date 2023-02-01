import React from "react";

type Props = {
    prefecture:{
        prefCode: number;
        prefName: string;
    }
}

const CheckBox: React.FC<Props> = (props) => {
    return <div>
         <input type="checkbox">{props.prefecture.prefName}</input>
    </div>
}