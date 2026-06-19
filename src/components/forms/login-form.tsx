"use client";


import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";


import {
  LoginInput,
  LoginSchema,
} from "@/validators/login-schema";


import { loginUser } from "@/actions/auth/login";


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



export default function LoginForm() {


const form =
useForm<LoginInput>({
resolver:zodResolver(LoginSchema),

defaultValues:{
email:"",
password:"",
},
});


const [isPending,setIsPending]=useState(false);



async function onSubmit(values:LoginInput){

setIsPending(true);


const result =
await loginUser(values);



if(result.error){
toast.error(result.error);
}



if(result.success){
toast.success(result.success);
}



setIsPending(false);

}



return (

<Card className="w-[400px]">

<CardHeader>

<CardTitle>
Login
</CardTitle>

</CardHeader>


<CardContent>


<Form {...form}>


<form
onSubmit={form.handleSubmit(onSubmit)}
className="space-y-4"
>


<FormField

control={form.control}

name="email"

render={({field})=>(

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

<FormMessage/>

</FormItem>

)}

/>



<FormField

control={form.control}

name="password"

render={({field})=>(

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

<FormMessage/>

</FormItem>

)}

/>



<Button
disabled={isPending}
type="submit"
>

{
isPending
?
"Logging in..."
:
"Login"
}

</Button>


</form>


</Form>


</CardContent>


</Card>

);

}