import images from '../../assets';
import Image, { StaticImageData } from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { NFTContext } from '../../context/NFTContext';

type CreatorCardProps = {
  rank: number;
  image: StaticImageData;
  name: string;
  eths: number;
}

const CreatorCard = ({ rank, image, name, eths }: CreatorCardProps) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  const { nftCurrency } = useContext(NFTContext);

  return (
    <div className={'min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4'}>
      <div className={'w-8 h-8 minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter rounded-full'}>
        <p className={'font-poppins text-white font-semibold text-base minlg:text-lg'}>{rank}</p>
      </div>

      <div className={'my-2 flex justify-center'}>
        <div className={'relative w-20 h-20 minlg:w-28 minlg:h-28'}>
          <Image src={image} layout={'fill'} objectFit={'cover'} alt={'Creator name'} className={'rounded-full'} />
          <div className={'absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0'}>
            <Image src={images.tick} layout={'fill'} objectFit={'contain'} alt={'Tick'} />
          </div>
        </div>
      </div>

      <div className={'mt-3 minlg:mt-7 text-center flexCenter flex-col'}>
        <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-base'}>{name}</p>
        <p className={'mt-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-base'}>
          {eths.toFixed(2)}&nbsp;
          <span className={'font-normal'}>{nftCurrency}</span>
        </p>
      </div>
    </div>
  );
};

export default CreatorCard;