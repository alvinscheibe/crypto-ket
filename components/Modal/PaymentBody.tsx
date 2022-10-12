import { NFTProps } from '../../pages/nft-details';
import Image from 'next/image';
import { shortenAddress } from '../../utils/shortenAddress';

type PaymentBodyProps = {
  nft: NFTProps;
  nftCurrency: string;
};

const PaymentBody = ({ nft, nftCurrency }: PaymentBodyProps) => {
  return (
    <div className={'flex flex-col'}>
      <div className={'flexBetween'}>
        <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl'}>Item</p>
        <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl'}>Subtotal</p>
      </div>

      <div className={'flexBetweenStart my-5'}>
        <div className={'flex-1 flexStartCenter'}>
          <div className={'relative w-28 h-28'}>
            <Image src={nft.image} layout={'fill'} objectFit={'cover'} />
          </div>
          <div className={'flexCenterStart flex-col ml-5'}>
            <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl'}>{shortenAddress(nft.seller)}</p>
            <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl'}>{nft.name}</p>
          </div>
        </div>
        <div className={''}>
          <p className={'font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl'}>{nft.price} <span className={'font-semibold'}>{nftCurrency}</span></p>
        </div>
      </div>

      <div className={'flexBetween mt-10'}>
        <p className={'font-poppins dark:text-white text-nft-black-1 font-normal text-base minlg:text-xl'}>Total</p>
        <p className={'font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl'}>{nft.price} <span className={'font-semibold'}>{nftCurrency}</span></p>
      </div>
    </div>
  );
}

export default PaymentBody;