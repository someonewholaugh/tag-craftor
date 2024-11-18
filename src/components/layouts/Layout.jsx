import Header from '@/components/layouts/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container w-full max-w-3xl lg:max-w-[61rem] px-6 mx-auto mt-4 md:px-0">
        {children}
      </main>
    </>
  );
};

export default Layout;
