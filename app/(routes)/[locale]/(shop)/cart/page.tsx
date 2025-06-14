'use client'

import { useShoppingCart } from "@/app/contexts/ShoppingCart"
import { motion } from "framer-motion"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import Link from "next/link"


const CartPage = () => {
    const {cartItems} = useShoppingCart() as ShoppingCartContextType

    return(
        <div className={"w-full"}>
            {
                cartItems.length > 0 ?
                    <>
                        <div className={"flex flex-row px-1 py-2 items-center gap-1 w-full text-gray-700"}>
                            <div className={"font-bold text-gray-700 mb-2 "}>
                                Bag
                            </div>
                        </div>
                        <motion.div className={"flex flex-row gap-4"}>
                            <motion.div className={"w-2/3 flex flex-col"}>
                                
                            </motion.div>
                            <motion.div className={"w-1/3"}>
                                
                            </motion.div>
                        </motion.div>
                    </>
                    :
                    <motion.div
                        exit={{opacity: 0, y: 200}}
                        initial={{opacity: 0, y: 200}}
                        animate={{opacity: 1, y: 0}}
                        className="flex flex-col justify-center items-center h-96">
                        <ShoppingBagIcon
                            className="h-24 w-24 text-gray-400"
                            aria-hidden="true"
                        />
                        <p className="my-4 text-gray-700 font-semibold">Your bag is empty</p>
                        <Link href={"/"}>
                            <p className="text-gray-700 text-xs py-1 my-2 hover:cursor-pointer">
                                Explore products
                            </p>
                        </Link>
                    </motion.div>
            }
        </div>
    )
}

export default CartPage