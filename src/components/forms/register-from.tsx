"use client";


import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";


import {
  RegisterInput,
  RegisterSchema,
} from "@/validators/register-schema";


import { registerUser } from "@/actions/auth/register";


import { toast } from "sonner";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



export default function RegisterForm() {


  const form =
    useForm<RegisterInput>({

      resolver:
        zodResolver(RegisterSchema),

      defaultValues: {

        name: "",
        email: "",
        password: "",
        confirmPassword: "",

      },

    });



  const [isPending, setIsPending] =
    useState(false);



  async function onSubmit(
    values: RegisterInput
  ) {

    setIsPending(true);


    const result =
      await registerUser(values);



    if (result.error) {

      toast.error(result.error);

    }


    if (result.success) {

      toast.success(result.success);

      form.reset();

    }


    setIsPending(false);

  }



  return (

    <Card className="w-[400px]">

      <CardHeader>

        <CardTitle>
          Register
        </CardTitle>

      </CardHeader>


      <CardContent>


        <Form {...form}>


          <form
            onSubmit={
              form.handleSubmit(onSubmit)
            }
            className="space-y-4"
          >


            <FormField

              control={form.control}

              name="name"

              render={({ field }) => (

                <FormItem>

                  <FormLabel>
                    Name
                  </FormLabel>


                  <FormControl>

                    <Input
                      placeholder="John"
                      {...field}
                    />

                  </FormControl>


                  <FormMessage />

                </FormItem>

              )}

            />



            <FormField

              control={form.control}

              name="email"

              render={({ field }) => (

                <FormItem>

                  <FormLabel>
                    Email
                  </FormLabel>


                  <FormControl>

                    <Input
                      placeholder="john@example.com"
                      {...field}
                    />

                  </FormControl>


                  <FormMessage />

                </FormItem>

              )}

            />



            <FormField

              control={form.control}

              name="password"

              render={({ field }) => (

                <FormItem>

                  <FormLabel>
                    Password
                  </FormLabel>


                  <FormControl>

                    <Input
                      type="password"
                      {...field}
                    />

                  </FormControl>


                  <FormMessage />

                </FormItem>

              )}

            />



            <FormField

              control={form.control}

              name="confirmPassword"

              render={({ field }) => (

                <FormItem>

                  <FormLabel>
                    Confirm Password
                  </FormLabel>


                  <FormControl>

                    <Input
                      type="password"
                      {...field}
                    />

                  </FormControl>


                  <FormMessage />

                </FormItem>

              )}

            />



            <Button
              disabled={isPending}
              type="submit"
            >

              {isPending
                ? "Creating Account..."
                : "Register"}

            </Button>



          </form>


        </Form>


      </CardContent>


    </Card>

  );
}