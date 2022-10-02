import images from '../assets';
import type { NextPage } from 'next';
import { Banner, CreatorCard } from '../components';
import { useRef } from 'react';
import { StaticImageData } from 'next/image';
import { makeId } from '../utils/makeId';

const Home: NextPage = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  return (
    <div className={'flex justify-center sm:px-4 p-12'}>
      <div className={'w-full minmd:w-4/5'}>
        <Banner
          parentStyles={'justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl'}
          childStyles={'md:text-4xl sm:text-2xl xs:text-xl text-left'}
          text={'Discover, collect and sell extraordinary NFTs'}
        />

        <div className={''}>
          <h1 className={'font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0'}>Best creators</h1>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
