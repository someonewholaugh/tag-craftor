import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { ButtonGroup } from '@nextui-org/button';
import ThemeSwitcher from '@/components/features/ThemeSwitcher';
import About from '@/components/features/About';
import Icon from '@/components/common/Icon';

const Header = () => {
    return (
        <Navbar shouldHideOnScroll maxWidth="sm">
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
