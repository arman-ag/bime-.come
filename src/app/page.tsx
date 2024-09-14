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
import { getAddress } from './_service/service';
import { detailType } from './_service/type';
import { storeUserInfo } from './redux/features/personalInfo/infoSlice';
const Main = () => {
  const [userAddress, setUserAddress] = useState<detailType[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const nationalIdRegExp = /^[0-9]{10}$/;
  const phoneRegExp = /^(\+98|0)?9\d{9}$/;
  const schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'شماره تلفن همراه وارد شده معتبر نیست')
      .required('این قسمت نمی‌تواند خالی باشد'),
    nationalId: Yup.string()
      .matches(nationalIdRegExp, 'کدملی وارد شده معتبر نیست')
      .required('این قسمت نمی‌تواند خالی باشد'),
  });
  const userInfo = useSelector((state) => state.personalInfo);
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...userInfo },
  });
  const onSubmit = (data) => {
    console.log('data', data);
    dispatch(storeUserInfo(data));
    router.push('/successful-message');
  };

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

  return (
    <>
      <p>آدرس جهت درج روی بیمه‌نامه</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-2/3 space-y-6'
        >
          <FormField
            control={form.control}
            name='nationalId'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='number' placeholder='کدملی' {...field} />
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
          <h2>آدرس جهت درج روی بیمه‌نامه</h2>
          <Separator />
          {userInfo.addressId ? (
            <p>{userInfo.addressId}</p>
          ) : (
            <p>لطفا آدرسی را که می‌خواهید روی بیمه‌ نامه درج شود، وارد کنید.</p>
          )}

          <Drawer>
            <DrawerTrigger asChild>
              <Button>انتخاب از آدرس‌های من</Button>
            </DrawerTrigger>
            <AddressDrawer userAddress={userAddress} />
          </Drawer>

          <Button type='submit'>تایید و ادامه</Button>
        </form>
      </Form>
    </>
  );
};

export default Main;
