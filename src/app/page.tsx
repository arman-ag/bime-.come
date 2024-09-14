'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import AddressDrawer from './_components/addressDrawer';
import { getAddress, saveOrderRequest } from './_service/service';
import { detailType } from './_service/type';
import { storeUserInfo } from './redux/features/personalInfo/infoSlice';
const Main = () => {
  const [userAddress, setUserAddress] = useState<detailType[]>([]);
  const [chosenAddress, setChosenAddress] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const nationalIdRegExp = /^[0-9]{10}$/;
  const phoneRegExp = /^(\+98|0)?9\d{9}$/;
  const schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'شماره تلفن همراه وارد شده معتبر نیست')
      .required('این قسمت نمی‌تواند خالی باشد'),
    nationalId: Yup.string()
      .matches(nationalIdRegExp, 'کد ملی وارد شده معتبر نیست')
      .required('این قسمت نمی‌تواند خالی باشد'),
  });
  const userInfo = useSelector((state) => state.personalInfo);
  const {
    formState: { errors },
    ...form
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...userInfo },
  });
  const onSubmit = async (data) => {
    dispatch(storeUserInfo(data));
    const userData = { ...data, ...chosenAddress };
    try {
      await saveOrderRequest(userData);
      router.push('/successful-message');
    } catch (error) {
      console.log(error);
    }
  };
  console.log('data', userInfo);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getAddress();
        setUserAddress(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const userAddressName = () => {
    const address = userAddress.find(
      (item) => item.id === chosenAddress.addressId
    );
    return address?.name;
  };
  return (
    <div className='px-[1.2rem] mt-[2rem] '>
      <p className=''>لطفا اطلاعات شخصی مالک خودرو را وارد کنید :</p>
      <Separator className='mt-[.5rem] bg-[#E0E0E0]' />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name='nationalId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={`mt-[1rem] ${
                        errors.nationalId && 'border-[#E61F10]'
                      }`}
                      type='number'
                      placeholder='کد ملی'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={`mt-[1.37rem] ${
                        errors.phoneNumber && 'border-[#E61F10]'
                      }`}
                      dir='rtl'
                      type='tel'
                      placeholder=' شماره تلفن همراه '
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <h2 className='font-semibold mt-[2rem] mb-[.5rem]	'>
              آدرس جهت درج روی بیمه‌ نامه
            </h2>
            <Separator color='#E0E0E0' />
            {chosenAddress?.addressId ? (
              <p className='text-sm	 mt-[1rem] mb-[.8rem]'>
                {userAddressName()}
              </p>
            ) : (
              <p className='text-sm	 mt-[1rem] mb-[.8rem]'>
                لطفا آدرسی را که می‌خواهید روی بیمه‌ نامه درج شود، وارد کنید.
              </p>
            )}

            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  color='#FFC453'
                  className='bg-[#FFC453] hover:bg-[#ffc35381] text-[#000000] block w-full mt-[1.7rem]'
                >
                  انتخاب از آدرس‌های من
                </Button>
              </DrawerTrigger>
              <AddressDrawer
                setChosenAddress={setChosenAddress}
                userAddress={userAddress}
              />
            </Drawer>
            <div className='flex justify-end mt-[2rem]'>
              <Button className='block w-[8.75rem]' type='submit'>
                تایید و ادامه
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Main;
