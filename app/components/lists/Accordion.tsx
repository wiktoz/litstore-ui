'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

interface AccordionInterface {
    title: string,
    children: React.ReactNode,
    isOpenDefault?: boolean
}

const Accordion = ({ title, children, isOpenDefault=false }:AccordionInterface) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault)

    return (
        <motion.div>
            <AnimatePresence>
                <motion.div
                    className="relative flex flex-row items-center justify-between p-2 text-gray-100 leading-7 text-sm hover:cursor-pointer transition-all z-20"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div>
                        {title}
                    </div>
                    
                    <motion.div 
                        animate={{
                            rotate: isOpen ? 90 : 0
                        }}
                        className="text-gray-50 leading-7 text-sm mr-1"
                    >
                        <ChevronRightIcon width={16} height={16}/>
                    </motion.div>
                </motion.div>

                {
                    isOpen && 
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, height: 0, y:-30 }}
                        animate={{
                        opacity: 1,
                        height:"auto",
                        y:0,
                        transition: {
                            duration: 0.2,
                        },
                        }}
                        exit={{ opacity: 0, height:0, y:-30}}
                        className="my-2"
                    >
                        {children}
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default Accordion