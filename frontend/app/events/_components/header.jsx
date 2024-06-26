'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/config"
import Image from "next/image"

const Header = () => {
  return (
    <nav>
    <ul className="flex justify-between items-center bg-blue-950 py-12 px-4">
        <Link href="/" className="font-semibold   text-white text-xl ">Event Hub</Link>
        <div className="flex gap-4 items-center">
        <li className="flex justify-center items-center">
            <Link className="text-white px-4 font-semibold  hover:text-white hover:bg-blue-700 rounded-full py-2" href="/events">Event List</Link>
            <Button variant="outlineWhite" className="bg-transparent border-white text-white font-semibold hover:text-white hover:bg-blue-700 rounded-full" onClick={async () => {
              await signOut(auth)
            }} >Sign out</Button>
        </li>
        </div>
    </ul>
</nav>
  )
}
export default Header