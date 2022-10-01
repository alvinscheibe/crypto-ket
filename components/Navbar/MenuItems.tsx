import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

type MenuItemsProps = {
  isMobile?: boolean;
  active: string;
  setActive: Dispatch<SetStateAction<string>>
};

const MenuItems = ({ isMobile = false, active, setActive }: MenuItemsProps) => {
  const generateLink = (index: number) => {
    switch (index) {
      case 0: return '/';
      case 1: return '/created-nfts';
      case 2: return '/my-nfts';
      default: return '/';
    }
  }

  return (
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, index) => (
        <li
          key={index}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${active === item? 'dark:text-white text-nft-black-1' : 'dark:text-nft-gray-3 text-nft-gray-2'}`}
          onClick={() => {
            setActive(item)
          }}>
          <Link href={generateLink(index)}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MenuItems;