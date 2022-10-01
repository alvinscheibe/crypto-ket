import MenuItems from './MenuItems';
import ButtonGroup from './ButtonGroup';
import { Dispatch, SetStateAction } from 'react';
import { NextRouter } from 'next/router';

type MenuDesktopProps = {
  active: string;
  setActive: Dispatch<SetStateAction<string>>,
  router: NextRouter
};

const MenuDesktop = ({ active, setActive, router }: MenuDesktopProps) => {
  return (
    <div className={'md:hidden flex'}>
      <MenuItems active={active} setActive={setActive} />
      <div className={'ml-4'}>
        <ButtonGroup setActive={setActive} router={router} />
      </div>
    </div>
  );
};

export default MenuDesktop;