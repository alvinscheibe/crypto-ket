import { NextPage } from 'next';
import images from '../assets';
import { useContext, useEffect, useState } from 'react';
import { ItemMetadataProps, NFTContext } from '../context/NFTContext';
import { Banner, Loader, NFTCard } from '../components';
import Image from 'next/image';
import { shortenAddress } from '../utils/shortenAddress';

const MyNFTs: NextPage = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState<ItemMetadataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs('fetchMyItems').then((items) => {
      setNfts(items);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <div className={'flexStart min-h-screen'}>
        <Loader />
      </div>
    );

  return (
    <div className={'w-full flex justify-start items-center flex-col min-h-screen'}>
      <div className={'w-full flexCenter flex-col'}>
        <Banner text={'Your Nifty NFTs'} parentStyles={'h-80 justify-center'} childStyles={'text-center mb-4'} />

        <div className={'flexCenter flex-col -mt-20 z-0'}>
          <div className={'flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full'}>
            <Image src={images.creator1} className={'rounded-full object-cover'} objectFit={'cover'} />
          </div>
          <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6'}>{shortenAddress(currentAccount)}</p>
        </div>
      </div>

      {!isLoading && nfts.length === 0 ? (
        <div className={'flexCenter sm:p-4 p-16'}>
          <h1 className={'font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl'}>No NFTs owned</h1>
        </div>
      ) : (
        <div className={'sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col'}>
          <div className={'flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8'}>
            SearchBar
          </div>
          <div className={'mt-3 w-full flex flex-wrap'}>
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={{
              index: nft.tokenId,
              name: nft.name,
              price: nft.price,
              seller: nft.seller,
              owner: nft.owner,
              description: nft.description,
              image: nft.image
            }} />)}
          </div>
        </div>
      )}

    </div>
  );
};

export default MyNFTs;