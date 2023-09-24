import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <ClipLoader size={'10vw'} color="aqua" />
    </div>
  );
};

export default Loading;
