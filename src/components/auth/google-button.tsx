"use client";


import { googleLogin }
from "@/actions/auth/google-login";


import { Button }
from "@/components/ui/button";



export default function GoogleButton() {


  async function handleGoogle() {

    await googleLogin();

  }



  return (

    <Button

      onClick={handleGoogle}

      variant="outline"

      className="w-full"

    >

      Continue with Google

    </Button>

  );

}