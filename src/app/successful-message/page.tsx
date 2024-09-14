'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const backButtonAction = () => {
    router.push('/');
  };
  return (
    <>
      <p>اطلاعات شما با موفقیت ثبت شد.</p>
      <Button onClick={backButtonAction}>بازگشت</Button>
    </>
  );
};

export default Home;
