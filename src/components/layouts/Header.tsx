import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Icon } from '@/components';
import type { HeaderProps } from '@/types';

export const Header = ({ title, children, type, setType }: HeaderProps) => {
  const toggleType = () => {
    if (!setType) return;
    setType(type === 'QrCode' ? 'Barcode' : 'QrCode');
  };

  return (
    <header className="flex items-center justify-between border-b border-zinc-300 pb-3 dark:border-zinc-600">
      {title ? (
        <span className="text-lg font-semibold">{title}</span>
      ) : (
        <Menu>
          <MenuButton className="inline-flex items-center gap-2 rounded-lg text-lg font-semibold focus:outline-none cursor-pointer hover:opacity-60 transition-opacity ease-in-out duration-300">
            {type}
            <Icon name="ChevronDown" />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom start"
            className="w-40 origin-top-right rounded-md border border-zinc-300 bg-white p-1 shadow transition-all duration-300 ease-in-out focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem
              as="button"
              onClick={toggleType}
              className="w-full cursor-pointer rounded-sm px-4 py-2 text-left text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              {type === 'QrCode' ? 'Barcode' : 'QrCode'}
            </MenuItem>
          </MenuItems>
        </Menu>
      )}
      {children}
    </header>
  );
};
