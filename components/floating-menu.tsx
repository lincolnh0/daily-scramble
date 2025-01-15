"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Cctv, ChartColumnIncreasing, Menu, User, House, Box} from "lucide-react"
import Link from "next/link"

// Navigation items array
const menuItems = [
  {name: "Profile", href: "/profile", icon: User},
  {name: "Interactive cube", href: "/interactive", icon: Box},
  {name: "Leaderboard", href: "/leaderboard", icon: ChartColumnIncreasing},
  {name: "Verify", href: "/verify", icon: Cctv},
];


export default function FloatingMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
      <div>
        <div
            className={`fixed my-4 origin-bottom right-16 bottom-32 flex transition flex-col gap-4 text-xs ${
                isMobileMenuOpen ? "scale-100" : "scale-0"
            }`}>

          {menuItems.map((item, index) => (
              <Link key={index} href={item.href} title={item.name} onClick={toggleMobileMenu}
                    className={"bg-gray-100 border p-4 rounded-full shadow hover:bg-gray-50"}>
                <div className={"flex items-center gap-4 font-medium font-mono uppercase justify-end"}>
                  <item.icon/>
                </div>
              </Link>
          ))}
        </div>
        <div className="fixed bottom-16 right-16 lg:hidden">
          <Button
              className={"shadow-lg rounded-full py-7 bg-gradient-to-br from-black to-gray-500 border-gray-500 border hover:scale-110 duration-300hover:from-gray-800 hover:to-gray-400 transition ease-in-out"}
              onClick={toggleMobileMenu}
          >
            <Menu/>
          </Button>
        </div>
      </div>
  )
      ;
}