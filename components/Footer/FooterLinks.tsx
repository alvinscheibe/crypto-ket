type FooterLinksProps = {
  heading: string;
  items: string[];
}

const FooterLinks = ({ heading, items }: FooterLinksProps) => {
  return (
    <div className={'flex-1 justify-start items-center'}>
      <h3 className={'font-poppins dark:text-white text-nft-black-1 font-semibold text-lg mb-10'}>{heading}</h3>
      {items.map((item, index) => (
        <p key={index} className={'font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3'}>{item}</p>
      ))}
    </div>
  );
}

export default FooterLinks;