import { Button } from '../index';
import { Dispatch, SetStateAction } from 'react';
import { NextRouter } from 'next/router';

type ButtonGroupProps = {
  setActive: Dispatch<SetStateAction<string>>;
  router: NextRouter;
}

const ButtonGroup = ({ setActive, router }: ButtonGroupProps) => {
  const hasConnected = false;

  return hasConnected? (
    <Button classStyles={'mx-2 rounded-xl'} btnName={'Create'} handleClick={() => {
      setActive('');
      router.push('/create-nft');
    }} />
  ) : (
    <Button classStyles={'mx-2 rounded-xl'} btnName={'Connect'} handleClick={() => {}} />
  );
};

export default ButtonGroup;