import React, { useContext } from 'react';
import { NFTContext } from '../../context/NFTContext';

type InputProps = {
  type: string;
  title: string;
  placeholder: string;
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, title, placeholder, handleClick }: InputProps) => {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <div className={'mt-10 w-full'}>
      <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'}>
        {title}
      </p>

      {
        type === 'number'? (
          <div
            className={'dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row'}
          >
            <input type={'number'} className={'flex w-full dark:bg-nft-black-1 bg-white outline-none'} placeholder={placeholder} onChange={handleClick} />
            <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'}>{nftCurrency}</p>
          </div>
        ) : type === 'textarea'? (
          <textarea
            rows={10}
            className={'dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3'}
            placeholder={placeholder}
            //@ts-ignore
            onChange={handleClick}
          ></textarea>
        ) : (
          <input
            className={'dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3'}
            placeholder={placeholder}
            onChange={handleClick}
          />
        )
      }
    </div>
  );
};

export default Input;