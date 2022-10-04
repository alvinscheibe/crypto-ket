import { NextPage } from 'next';
import images from '../assets';
import { useTheme } from 'next-themes';
import { useCallback, useMemo, useState } from 'react';
import { Heading } from '../components';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const CreateNft: NextPage = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();

  const onDrop = useCallback(() => {
    // Upload image to the IPFS
  }, []);

  const {
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webm'],
    },
    maxSize: 5000000,
  });

  const fileStyle = useMemo(() => (
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col item-center p-5 rounded-sm border-dashed
    ${isDragActive}? ' border-file-active ' : ''
    ${isDragAccept}? ' border-file-accept ' : ''
    ${isDragReject}? ' border-file-reject ' : ''
    `
  ), [
    isDragActive, isDragAccept, isDragReject
  ]);

  return (
    <div className={'flex justify-center sm:px-4 p-12'}>
      <div className={'w-3/5 md:w-full'}>
        <Heading title={'Create new NFT'} />
        <div className={'mt-16'}>
          <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'}>Upload file</p>
          <div className={'mt-4'}>
            <div className={`${fileStyle}`} {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={'flexCenter flex-col text-center'}>
                <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'}>
                  JPG, PNG, SVG, WEBM. Max 100mb.
                </p>
                <div className={'my-12 w-full flex justify-center'}>
                  <Image src={images.upload} width={100} height={100} objectFit={'contain'} alt={'File upload'} className={theme === 'light'? 'filter invert' : ''} />
                </div>
                <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-sm'}>
                  Drag and drop a file
                </p>
                <p className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2'}>
                  or browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div className={''}>
                  <Image src={fileUrl} alt={'Asset file'} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNft;