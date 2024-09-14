import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { detailType } from '../_service/type';
import { storeUserInfo } from '../redux/features/personalInfo/infoSlice';
type propType = {
  userAddress: detailType[];
};
const AddressDrawer = ({ userAddress }: propType) => {
  const form = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(storeUserInfo(data));
    console.log('data', data);
  };
  return (
    <DrawerContent>
      <div className='mx-auto w-full max-w-sm'>
        <DrawerHeader>
          <div className='flex items-center justify-between '>
            <DrawerTitle>انتخاب آدرس</DrawerTitle>
            <DrawerClose asChild>
              <Button type='button' variant='ghost'>
                <X />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
              e.stopPropagation();
            }}
          >
            <FormField
              control={form.control}
              name='addressId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      {...field}
                      dir='rtl'
                    >
                      <div>
                        {userAddress.map((item) => {
                          return (
                            <div key={item.id}>
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem
                                  className='ml-4'
                                  value={item.name}
                                  id={item.id}
                                />
                                <Label htmlFor={item.id}>{item.name}</Label>
                              </div>
                              <p>{item.details}</p>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button type='submit'>انتخاب</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </div>
    </DrawerContent>
  );
};
export default AddressDrawer;
