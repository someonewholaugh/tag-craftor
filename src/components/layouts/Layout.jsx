import Header from '@/components/layouts/Header';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="container max-w-[37rem] px-6 md:px-0 mx-auto mt-4">{children}</main>
        </>
    );
};

export default Layout;
