import { Views } from '@types';
import { Dispatch } from 'react';

interface BannerProps {
  updateView: Dispatch<React.SetStateAction<Views>>;
  otherView: Views;
}

export function Banner(props: BannerProps) {
  const { updateView, otherView } = props;

  return (
    <div className="flex items-center justify-center w-full h-[100px] border">
      <button type="button" onClick={() => updateView(otherView)}>
        {`View ${otherView}`}
      </button>
    </div>
  );
}
