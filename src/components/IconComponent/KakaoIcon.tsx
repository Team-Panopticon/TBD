import kakaotalk from '../../assets/kakaotalk_sharing_btn_medium.png';

interface IIconProps {
  fill?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  stroke?: string;
}
export const KakaoIcon: React.FC<IIconProps> = ({
  fill,
  height,
  stroke,
  style,
  width,
}: IIconProps) => {
  return (
    <img
      src={kakaotalk}
      alt="카카오톡 공유"
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
