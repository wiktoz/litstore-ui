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
                <div className="flex flex-col h-screen justify-between font-sans">
                    <Transition>
                        <div className={"flex flex-col h-full relative"}>
                            <div className={"sticky top-0 z-40 w-full"}>
                                <Navbar transparency={false}/>
                            </div>

                            <div className="grow my-auto bg-white min-h-[50vh] flex items-center justify-center">
                                {children}
                            </div>
                            <Footer/>
                        </div>
                    </Transition>
                </div>
            </Fragment>
    )
}