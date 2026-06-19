"use client";


import { logoutUser }
from "@/actions/auth/logout";


import { Button }
from "@/components/ui/button";



export default function LogoutButton(){


return (

<Button

onClick={() => logoutUser()}

>

Logout

</Button>

);


}