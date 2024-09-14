import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { detailType } from '../_service/type';
type propType = {
  userAddress: detailType[];
  setChosenAddress: React.Dispatch<React.SetStateAction<string>>;
};
type formSubmitType = {
  addressId: string;
};
const AddressDrawer = ({ userAddress, setChosenAddress }: propType) => {
  const form = useForm();

  const onSubmit = (data: formSubmitType): void => {
    setChosenAddress(data);
  };
  return (
    <DrawerContent>
      <div className='mx-auto w-full max-w-sm'>
        <div className='px-[1.25rem] py-[1.5rem]'>
          <div className='flex items-center justify-between '>
            <h2 className='font-medium 	'>انتخاب آدرس</h2>
            <DrawerClose asChild>
              <Button type='button' variant='ghost'>
                <X color='#C2C2C2' />
              </Button>
            </DrawerClose>
          </div>
        </div>
        <Separator className='bg-[#E0E0E0]' />
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
              e.stopPropagation();
            }}
          >
            <div className='px-[1.25rem] h-[20.18rem] mt-[.25rem] mb-[4.18rem]'>
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
                              <div
                                key={item.id}
                                className='flex items-start mt-[1rem] '
                              >
                                <RadioGroupItem
                                  className='ml-4'
                                  value={item.id}
                                  id={item.id}
                                />
                                <div>
                                  <Label htmlFor={item.id}>{item.name}</Label>
                                  <p className='text-xs	 text-[#C2C2C2]'>
                                    {item.details}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter className='  shadow-lg'>
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
