import Hifive from '../../assets/hifive.svg';

interface IIconProps {
  fill?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  stroke?: string;
}
export const HifiveIcon: React.FC<IIconProps> = ({
  fill,
  height,
  stroke,
  style,
  width,
}: IIconProps) => {
  return (
    <img
      src={Hifive}
      alt="드롭다운 버튼"
      style={{
        width: width,
        height: height,
        fill: fill,
        stroke: stroke,
        ...style,
      }}
    />
  );
};
