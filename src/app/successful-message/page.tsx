'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const backButtonAction = () => {
    router.push('/');
  };
  return (
    <div className='flex flex-col justify-between h-full px-[1.5rem]'>
      <p className='text-[#34A862] font-semibold text-xl  pl	mt-[2rem]'>
        اطلاعات شما با موفقیت ثبت شد.
      </p>
      <div className='flex justify-end mb-[2rem]'>
        <Button className='w-[8.75rem]' onClick={backButtonAction}>
          بازگشت
        </Button>
      </div>
    </div>
  );
};

export default Home;
