import { useTheme } from 'next-themes';

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={'flex items-center mr-2'}>
      <input type={'checkbox'} className={'checkbox'} id={'checkbox'} onChange={() => setTheme(theme === 'light'? 'dark' : 'light')} />
      <label htmlFor={'checkbox'} className={'flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label'}>
        <i className={'fas fa-sun'} />
        <i className={'fas fa-moon'} />
        <div className={'w-3 h-3 absolute bg-white rounded-full ball'} />
      </label>
    </div>
  );
};

export default ToggleTheme;