"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {MonitorCheck, Menu, User, Box, Trophy} from "lucide-react"
import Link from "next/link"

// Navigation items array
const menuItems = [
  {name: "Profile", href: "/profile", icon: User},
  {name: "Interactive cube", href: "/interactive", icon: Box},
  {name: "Leaderboard", href: "/leaderboard", icon: Trophy},
  {name: "Verify", href: "/verify", icon: MonitorCheck},
];


export default function FloatingMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
      <div className={"lg:hidden"}>
        <div
            className={`fixed my-4 origin-bottom right-5 sm:right-10 bottom-16 sm:bottom-20 flex transition flex-col gap-4 sm:gap-4 text-xs ${
                isMobileMenuOpen ? "scale-75 sm:scale-100" : "scale-0"
            }`}>

          {menuItems.map((item, index) => (
              <Link key={index} href={item.href} title={item.name} onClick={toggleMobileMenu}
                    className={"bg-gray-100 dark:bg-gray-800 border p-4 rounded-full shadow hover:bg-gray-50 dark:hover:bg-gray-500"}>
                <div className={"flex items-center gap-4 font-medium font-mono uppercase justify-end"}>
                  <item.icon/>
                </div>
              </Link>
          ))}
        </div>
        <div className="fixed bottom-5 right-5 sm:right-10 scale-75 sm:scale-100">
          <Button
              className={"shadow-lg text-foreground rounded-full py-7 bg-gray-100 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-500 border hover:scale-110 duration-300 transition ease-in-out"}
              onClick={toggleMobileMenu}
          >
            <Menu/>
          </Button>
        </div>
      </div>
  )
      ;
}