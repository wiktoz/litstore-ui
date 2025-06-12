'use client'

import { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import useSWR from 'swr'
import { AuthError, fetcher } from '@/app/utils/api'
import Spinner from '@/app/components/loaders/Spinner'
import SignOut from '@/app/components/buttons/SignOut'

import { Link } from '@/i18n/routing'

import { useShoppingCart } from "@/app/contexts/ShoppingCart"
import Error from '../errors/Error'

interface NavbarInterface {
  transparency: boolean
}

export default function Navbar({transparency}:NavbarInterface) {
  const [open, setOpen] = useState<boolean>(false)
  const {cartQty} = useShoppingCart() as ShoppingCartContextType

  const { data: user, error: userError, isLoading: isUserLoading } = useSWR<UserInterface>('/users/me', fetcher, {errorRetryInterval: 10000, errorRetryCount: 5})
  const { data: categories, error: categoriesError, isLoading: isCategoryLoading } = useSWR<CategoryInterface[]>('/categories/all', fetcher, {errorRetryInterval: 10000, errorRetryCount: 5})

  return (
    <div className={transparency ? ("bg-black text-gray-200 " + (open ? "bg-opacity-60" : "bg-opacity-30")) : ("bg-gray-100 text-gray-600")}>
      {/*<MobileNavbar categories={categories ? categories : []} open={open} setOpen={setOpen}/>*/}
      {/* Standard Menu */}
      <header className="relative">
        <nav aria-label="Top" className="mx-auto w-full">
          <div className="p-2 lg:px-8">
            <div className="flex h-12 items-center">
              <button
                type="button"
                className="rounded-md p-2 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <Link href="/">
              <div className="mx-4 flex lg:ml-0 hover:cursor-pointer">
                  <span className="sr-only">Logo</span>
                    <Image
                      src={transparency ? "/img/litstore.png" : "/img/litstore-black.png"}
                      className="h-4 w-auto align-bottom opacity-90"
                      width="0"
                      height="0"
                      sizes="100vw"
                      alt="logo"
                    />
              </div>
              </Link>

              {/* Flyout menus */}
              <div className="flex items-center mx-4">
                {
                  isCategoryLoading ? <Spinner/> :
                  categoriesError ? <Error error={categoriesError}/> :
                  <div className='flex gap-5 text-sm'>
                    {
                      categories && categories.filter((category) => category.display_navbar).slice(0, 5).map(category => {
                        return(
                          <div key={category.id}>
                            <Link href={"/category/" + category.slug}>
                              <p className='hover:text-gray-400 hover:cursor-pointer'>
                                {category.name}
                              </p>
                            </Link>
                          </div>
                        )
                      })
                    }
                  </div>
                  
                }
              </div>

              <div className="ml-auto flex items-center">
                <div className="text-sm font-normal hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  { 
                    isUserLoading ?
                    <Spinner/>
                    :
                    userError instanceof AuthError ?
                    <>
                      <Link href={"/auth/sign-in"}>
                        <p className='hover:text-gray-400 hover:cursor-pointer'>
                          Sign In
                        </p>
                      </Link>
                      <span className="h-4 w-px bg-gray-400" aria-hidden="true" />
                      <Link href={"/auth/signup"}>
                        <p className='hover:text-gray-400 hover:cursor-pointer'>
                          Create account
                        </p>
                      </Link>
                    </> :

                    userError ?
                    <Error error={userError}/>
                    :
                    <SignOut/>
                  }
                  <span className="h-4 w-px bg-gray-400 mx-2" aria-hidden="true" />
                </div>

                {/* Search */}
                <div className="ml-2 flow-root lg:ml-4">
                  <Link href={"/search"} className="flex items-center p-2">
                    <div className='flex flex-row align-items-center hover:cursor-pointer hover:text-gray-400'>
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true" />
                    </div>
                  </Link>
                </div>

                {/* User Account */}
                <div className="ml-2 flow-root lg:ml-4">
                  <Link href={"/user/profile"} className="flex items-center p-2">
                    <div className='flex flex-row align-items-center hover:cursor-pointer hover:text-gray-400'>
                      <span className="sr-only">Profile</span>
                      <UserIcon className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true" />
                    </div>
                  </Link>
                </div>

                {/* Cart */}
                <div className="ml-2 flow-root lg:ml-4">
                  <Link href={"/cart"} className="flex items-center p-2">
                    <div className="flex flex-row align-items-center hover:cursor-pointer hover:text-gray-400">
                      <ShoppingBagIcon
                        className="h-5 w-5 flex-shrink-0 "
                        aria-hidden="true"
                      />
                      <span className="mx-1 h-full my-auto text-sm font-medium">{cartQty}</span>
                      <span className="sr-only">items in cart, view bag</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}