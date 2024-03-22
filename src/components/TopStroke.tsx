import React from 'react';
import { Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';
const { width, height } = Dimensions.get('window');

export default function TopStroke() {
    return (
        <Svg
            width={width}
            height={144}
            fill="none"
        >
            <Path
                fill="#fff"
                stroke="#fff"
                d="M193.857 136.039C177.097 134.539 75.085 94.727 0 111.532V0h419v97.528c-30.54 18.172-118.326 62.518-225.143 38.511Z"
            />
        </Svg>
    );
}