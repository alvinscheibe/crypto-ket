import images from '../assets';
import type { NextPage } from 'next';
import { Banner, CreatorCard, Heading, NFTCard } from '../components';
import { useContext, useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { makeId } from '../utils/makeId';
import { useTheme } from 'next-themes';
import { ItemMetadataProps, NFTContext } from '../context/NFTContext';

const Home: NextPage = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [hideArrowButtons, setHideArrowButtons] = useState(false);
  const [nfts, setNfts] = useState<ItemMetadataProps[]>([]);
  const { fetchNFTs } = useContext(NFTContext);

  useEffect(() => {
    fetchNFTs().then((items) => {
      console.log(items);
      setNfts(items);
    });
  }, []);

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left')
      // @ts-ignore
      current.scrollLeft -= scrollAmount;
    else
      // @ts-ignore
      current.scrollLeft += scrollAmount;
  }

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    // @ts-ignore
    if (current?.scrollWidth >= parent?.offsetWidth)
      setHideArrowButtons(true);
    else
      setHideArrowButtons(false);
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  return (
    <div className={'flex justify-center sm:px-4 p-12'}>
      <div className={'w-full minmd:w-4/5'}>
        <Banner
          parentStyles={'justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl'}
          childStyles={'md:text-4xl sm:text-2xl xs:text-xl text-left'}
          text={'Discover, collect and sell extraordinary NFTs'}
        />

        <div className={''}>
          <Heading title={'Best creators'} />
          <div className={'relative flex-1 max-w-full flex mt-3'} ref={parentRef}>
            <div className={'flex flex-row w-max overflow-x-scroll no-scrollbar select-none'} ref={scrollRef}>
              {[6, 7, 8, 9, 10].map((index) => {
                //@ts-ignore
                const imageCreator: StaticImageData = images[`creator${index}`];

                return (
                  <CreatorCard
                    key={`creator-${index}`}
                    rank={index}
                    image={imageCreator}
                    name={`0x${makeId(3)}...${makeId(4)}`}
                    eths={10 - index * 0.5}
                  />
                );
              })}
              {hideArrowButtons && (
                <>
                  <div className={'absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0'} onClick={() => handleScroll('left')}>
                    <Image src={images.left} layout={'fill'} objectFit={'contain'} alt={'Left arrow'} className={theme === 'light'? 'filter invert' : ''} />
                  </div>
                  <div className={'absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0'} onClick={() => handleScroll('right')}>
                    <Image src={images.right} layout={'fill'} objectFit={'contain'} alt={'Right arrow'} className={theme === 'light'? 'filter invert' : ''} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={'mt-10'}>
          <div className={'flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start'}>
            <h1 className={'flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 sm:mb-4'}>Hot bids</h1>
            <div>SearchBar</div>
          </div>
          <div className={'mt-3 w-full flex flex-wrap justify-start md:justify-center'}>
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={{
              index: nft.tokenId,
              name: nft.name,
              price: nft.price,
              seller: nft.seller,
              owner: nft.owner,
              description: nft.description,
              image: nft.image
            }} />)}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
              //@ts-ignore
              const imageNFT: StaticImageData = images[`nft${item}`];

              return (
                <NFTCard
                  key={`nft-${item}`}
                  nft={{
                    index: item,
                    name: `Nifty NFT ${item}`,
                    seller: `0x${makeId(3)}...${makeId(4)}`,
                    owner: `0x${makeId(3)}...${makeId(4)}`,
                    description: 'Cool NFT on sale',
                    image: imageNFT,
                    price: Number((10 - item * Math.random()).toFixed(2))
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
