import { ReactComponent as Hifive } from '../../assets/hifive.svg';

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
  return <Hifive width={width} height={height} fill={fill} style={style} />;
};
