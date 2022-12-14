import images from '../../assets';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { NFTContext } from '../../context/NFTContext';
import { BigNumber } from 'ethers';
import { shortenAddress } from '../../utils/shortenAddress';

type NFTCardProps = {
  nft: {
    index: number;
    name: string;
    seller: string;
    owner: string;
    description: string;
    price: string | number;
    image: string;
  }
}

const NFTCard = ({ nft }: NFTCardProps) => {
  const { nftCurrency } = useContext(NFTContext);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return (
    <Link href={{
      pathname: '/nft-details', query: {
        index: nft.index,
        name: nft.name,
        seller: nft.seller,
        owner: nft.owner,
        description: nft.description,
        image: nft.image,
        price: nft.price
      }
    }}>
      <div className={'flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md'}>
        <div className={'relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden'}>
          <Image src={nft.image} layout={'fill'} objectFit={'cover'} alt={`nft${nft.index}`} />
        </div>
        <div className={'mt-3 flex flex-col'}>
          <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl'}>{nft.name}</p>
          <div className={'flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3'}>
            <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg'}>
              <>
                {nft.price}&nbsp;
                <span className={'normal'}>{nftCurrency}</span>
              </>
            </p>
            <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg'}>{nft.seller.length > 10? shortenAddress(nft.seller) : nft.seller}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;