import images from '../../assets';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className={'flex flex-1 flex-row justify-start'}>
      <Link href={'/'}>
        <div className={'flexCenter md:hidden cursor-pointer'} onClick={() => {}}>
          <Image src={images.logo02} objectFit={'contain'} width={32} height={32} alt={'Logo'} />
          <p className={'dark:text-white text-nft-black-1 font-semibold text-lg ml-1'}>CryptoKet</p>
        </div>
      </Link>
      <Link href={'/'}>
        <div className={'hidden md:flex'} onClick={() => {}}>
          <Image src={images.logo02} objectFit={'contain'} width={32} height={32} alt={'Logo'} />
        </div>
      </Link>
    </div>
  );
}

export default Logo;