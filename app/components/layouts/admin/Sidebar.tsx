'use client'

import { ReactElement, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import SidebarButton from "./SidebarButton"
import Accordion from "@/app/components/lists/Accordion"
import { motion, AnimatePresence } from "framer-motion"

import {
    Bars3Icon,
    ReceiptPercentIcon,
    BuildingStorefrontIcon,
    RectangleStackIcon,
    ShoppingCartIcon,
    UsersIcon,
    TruckIcon,
    Squares2X2Icon,
    PlusCircleIcon,
    EyeIcon,
    QuestionMarkCircleIcon,
    Cog8ToothIcon,
    PhoneIcon
} from "@heroicons/react/24/outline"

interface Button {
    icon: ReactElement,
    title: string,
    link: string
}

interface AccordionType {
    title: string,
    items: Button[]
}

const buttons: Button[] = [
    { title: "Products", icon: <BuildingStorefrontIcon width={18} height={18} />, link: "/admin/products" },
    { title: "Store", icon: <RectangleStackIcon width={18} height={18} />, link: "/admin/store" },
    { title: "Orders", icon: <ShoppingCartIcon width={18} height={18} />, link: "/admin/orders" },
    { title: "Users", icon: <UsersIcon width={18} height={18} />, link: "/admin/users" },
    { title: "Delivery Methods", icon: <TruckIcon width={18} height={18} />, link: "/admin/deliveries" },
    { title: "Promo Codes", icon: <ReceiptPercentIcon width={18} height={18} />, link: "/admin/promo-codes" }
]

const accordions: AccordionType[] = [
    {
        title: "Products",
        items: [
            { icon: <EyeIcon width={18} height={18} />, title: "Show", link: "/admin/products" },
            { icon: <PlusCircleIcon width={18} height={18} />, title: "Add", link: "/admin/products/add" },
            { icon: <Squares2X2Icon width={18} height={18} />, title: "Variants", link: "/admin/products/variants" }
        ]
    },
    {
        title: "Categories",
        items: [
            { icon: <EyeIcon width={18} height={18} />, title: "Show", link: "/admin/categories" },
            { icon: <PlusCircleIcon width={18} height={18} />, title: "Add", link: "/admin/categories/add" }
        ]
    },
    {
        title: "Settings",
        items: [
            { icon: <Cog8ToothIcon width={18} height={18} />, title: "Main Settings", link: "/admin/settings/main" },
            { icon: <PhoneIcon width={18} height={18} />, title: "Contact Details", link: "/admin/settings/contact" },
            { icon: <QuestionMarkCircleIcon width={18} height={18} />, title: "FAQ", link: "/admin/settings/faq" }
        ]
    }
]

export default function Sidebar() {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const handleMenu = () => setIsNavOpen(!isNavOpen)

    return (
        <>
            {/* Top navbar for small screens */}
            <div className="md:hidden w-full sticky top-0 h-16 bg-gray-800 text-white z-30">
                <div className="flex flex-row items-center justify-between h-full px-4 z-60">
                    <Link href="/admin">
                        <Image
                            src="/img/litstore.png"
                            className="h-5 w-auto opacity-80"
                            width="0"
                            height="0"
                            sizes="100vw"
                            alt="logo"
                        />
                    </Link>
                    <Bars3Icon
                        className="w-6 h-6 cursor-pointer"
                        onClick={handleMenu}
                    />
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                {isNavOpen && (
                    <motion.div 
                        className="absolute top-16 left-0 w-full bg-gray-800 shadow-lg z-40 p-4 pb-8 overflow-y-scroll max-h-[calc(100vh-4rem)]"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto", transition: { when: "beforeChildren", delayChildren: 0.7 } },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="flex flex-col gap-2">
                            {buttons.map((item, index) => (
                                <SidebarButton
                                    title={item.title}
                                    icon={item.icon}
                                    link={item.link}
                                    key={item.title + index}
                                />
                            ))}
                            <div className="py-2"></div>
                            {
                            accordions.map((accordion, index) => {
                                return(
                                    <div className="rounded-2xl px-2" key={accordion.title + index}>
                                        <Accordion title={accordion.title}>
                                            <div className="flex flex-col gap-2 px-2 pb-2">
                                                {accordion.items.map(button => (
                                                    <SidebarButton
                                                        icon={button.icon}
                                                        title={button.title}
                                                        link={button.link}
                                                        key={button.link + button.title}
                                                    />
                                                ))}
                                            </div>
                                        </Accordion>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            {/* Sidebar for medium and larger screens */}
            <div className="hidden md:block md:sticky top-0 h-screen w-80 bg-gray-800 text-white shadow overflow-auto">
                <div className="mx-4 my-2 flex flex-col gap-3">
                    <div className="text-xl font-bold leading-6 my-4 mx-1">
                        <Link href="/admin">
                            <Image
                                src="/img/litstore.png"
                                className="h-5 w-auto opacity-80"
                                width="0"
                                height="0"
                                sizes="100vw"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    {buttons.map((item, index) => (
                        <SidebarButton
                            title={item.title}
                            icon={item.icon}
                            link={item.link}
                            key={item.title + index}
                        />
                    ))}
                    {accordions.map((accordion, index) => (
                        <Accordion
                            title={accordion.title}
                            key={accordion.title + index}
                        >
                            <div className="flex flex-col gap-2">
                                {accordion.items.map(button => (
                                    <SidebarButton
                                        icon={button.icon}
                                        title={button.title}
                                        link={button.link}
                                        key={button.link + button.title}
                                    />
                                ))}
                            </div>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    )
}
