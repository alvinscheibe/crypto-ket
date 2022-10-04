type HeadingProps = {
  title: string;
}

const Heading = ({ title }: HeadingProps) => {
  return (
    <h1 className={'font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0'}>
      {title}
    </h1>
  );
};

export default Heading;