'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <main>
        <div className="h-screen flex flex-col items-center justify-center text-center">
          <div className=" border-4 rounded-xl border-slate-300 p-10 flex flex-col items-center justify-center">
            <Image 
            className="rounded-2xl"
            src="/images/logo.jpg"
            width={300}
            height={300}
            alt="logo" 
            />
            <h1 className="text-7xl">Event Hub</h1>
            <p className="text-2xl  text-black  mt-4 text-muted-foreground">We show you the events that matters!</p>
            <div className="flex gap-4 mt-20">
              <Button asChild className="bg-transparent text-black  w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
                <Link href="/sign-up">Sign up</Link>
              </Button>
              <Button asChild className="bg-inherit text-black  w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
                <Link href="/sign-in">Sign in</Link>
              </Button>
           </div>
          </div>
        </div>
      </main>
    </>
  )
}