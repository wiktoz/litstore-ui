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
                        <div className={"relative"}>
                            <div className={"fixed top-0 z-40 w-full"}>
                                <Navbar/>
                            </div>

                            <div className="container mx-auto mb-auto grow bg-white">
                                <div className="w-full h-full rounded">
                                    <div className="container">
                                        {children}
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </Transition>
                </div>
            </Fragment>
    )
}