import { RotatingLines } from 'react-loader-spinner';
import { LoaderBox } from './Loading.styled';

export default function Loader() {
  return (
    <LoaderBox>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      ;
    </LoaderBox>
  );
}
