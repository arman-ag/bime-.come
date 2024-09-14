const MainLayout = ({ children }) => {
  return (
    <>
      <header className='shadow-lg px-[1.25rem] py-[.9rem]'>
        <h1 className='font-semibold	 text-lg	'>تکمیل اطلاعات</h1>
      </header>
      {children}
      <footer></footer>
    </>
  );
};

export default MainLayout;
