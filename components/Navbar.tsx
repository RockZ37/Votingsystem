import { truncate } from '@/utils/helper'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaWallet } from 'react-icons/fa'
import { MdDashboard, MdHowToVote } from 'react-icons/md'

const Navbar = () => {
  const wallet = '' // modify later
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-dark-100/60 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <MdHowToVote className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Dapp<span className="text-white">Votes</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
              <MdDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            {wallet ? (
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                <FaWallet className="h-4 w-4" />
                <span>{truncate({ text: wallet, startChars: 4, endChars: 4, maxLength: 11 })}</span>
              </button>
            ) : (
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                <FaWallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
