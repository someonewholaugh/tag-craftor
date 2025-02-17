import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { ButtonGroup } from "@heroui/button";
import ThemeSwitcher from '@/components/features/ThemeSwitcher';
import About from '@/components/features/About';
import Icon from '@/components/common/Icon';

const Header = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Icon name="CodeXml" size="28" />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ButtonGroup>
            <ThemeSwitcher />
            <About />
          </ButtonGroup>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
