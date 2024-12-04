import { CSSProperties } from "react";

const WeatherCardStyles = () => {
  const styles: Record<string, CSSProperties> = {
    itemContainerTitle: {
      fontSize: 24,
    },
        itemContainerBody:{
            fontSize: '16px',
            textAlign: 'center'
    },
        itemContainerTemp:{
            fontSize: '46px',
            textAlign: 'center'
    },
  };
  return styles;
};

export default WeatherCardStyles;