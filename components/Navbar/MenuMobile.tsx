import images from '../../assets';
import Image from 'next/image';
import MenuItems from './MenuItems';
import ButtonGroup from './ButtonGroup';
import { Dispatch, SetStateAction, useState } from 'react';
import { NextRouter } from 'next/router';
import { useTheme } from 'next-themes';

type MenuMobileProps = {
  active: string;
  setActive: Dispatch<SetStateAction<string>>,
  router: NextRouter
};

const MenuMobile = ({ active, setActive, router }: MenuMobileProps) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={'hidden md:flex ml-2'}>
      {isOpen ? (
        <Image
          src={images.cross}
          objectFit={'contain'}
          width={20} height={20}
          alt={'Close'}
          onClick={() => setIsOpen(false)}
          className={theme === 'light'? 'filter invert' : ''}
        />
      ) : (
        <Image
          src={images.menu}
          objectFit={'contain'}
          width={25} height={25}
          alt={'Menu'}
          onClick={() => setIsOpen(true)}
          className={theme === 'light'? 'filter invert' : ''}
        />
      )}

      {isOpen && (
        <div className={'fixed inset-0 top-65 dark:bg-nft-dark z-10 nav-h flex justify-between flex-col'}>
          <div className={'flex-1 p-4'}>
            <MenuItems active={active} setActive={setActive} isMobile={true} />
          </div>
          <div className={'p-4 border-t dark:border-nft-black-1 border-nft-gray-1'}>
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuMobile;