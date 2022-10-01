import { useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './Logo';
import ToggleTheme from './ToggleTheme';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';

const Navbar = () => {
  const [active, setActive] = useState('Explore NFTs');
  const router = useRouter();

  return (
    <nav className={'flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1'}>
      <Logo />

      <div className={'flex flex-initial flex-row justify-end'}>
        <ToggleTheme />

        <MenuDesktop active={active} setActive={setActive} router={router} />
      </div>

      <MenuMobile active={active} setActive={setActive} router={router} />
    </nav>
  );
}

export default Navbar;