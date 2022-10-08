import { Button } from '../index';
import { Dispatch, SetStateAction, useContext } from 'react';
import { NextRouter } from 'next/router';
import { NFTContext } from '../../context/NFTContext';

type ButtonGroupProps = {
  setActive: Dispatch<SetStateAction<string>>;
  router: NextRouter;
}

const ButtonGroup = ({ setActive, router }: ButtonGroupProps) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount? (
    <Button classStyles={'mx-2 rounded-xl'} btnName={'Create'} handleClick={() => {
      setActive('');
      router.push('/create-nft');
    }} />
  ) : (
    <Button classStyles={'mx-2 rounded-xl'} btnName={'Connect'} handleClick={connectWallet} />
  );
};

export default ButtonGroup;