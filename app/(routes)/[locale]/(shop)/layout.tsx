import {Fragment, ReactElement} from 'react'
import Navbar from '@/app/components/layouts/Navbar'
import Footer from '@/app/components/layouts/Footer'
import Transition from '@/app/components/loaders/Transition'

export const metadata = {
    title: 'LitStore',
}

export default function ShopLayout({children}:{children: ReactElement}) {
    return (
            <Fragment>
                <div className="flex flex-col justify-between font-sans bg-gray-50">
                    <Transition>
                        <div className={"flex flex-col h-full relative"}>
                            <div className={"sticky top-0 z-40 w-full"}>
                                <Navbar transparency={false}/>
                            </div>

                            <div className="grow m-auto flex flex-col justify-center p-8 container min-h-[50vh]">
                                {children}
                            </div>
                            <Footer/>
                        </div>
                    </Transition>
                </div>
            </Fragment>
    )
}