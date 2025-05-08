import React from 'react'
import { motion } from 'framer-motion'
import { HiOutlinePlus } from 'react-icons/hi'

const Banner = () => {
  return (
    <div className="relative pt-20 pb-16 md:pt-28 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="block text-white">Decentralized Voting</span>
          <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Without Boundaries
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-lg mx-auto text-xl text-gray-300"
        >
          Create secure and transparent polls using blockchain technology. 
          Vote with confidence, knowing your voice matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex justify-center space-x-4"
        >
          <button className="flex items-center space-x-2 px-8 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25">
            <HiOutlinePlus className="h-5 w-5" />
            <span>Create Poll</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3"
        >
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-primary-400">100%</p>
            <p className="mt-2 text-gray-400">Transparent</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-primary-400">Secure</p>
            <p className="mt-2 text-gray-400">Blockchain Based</p>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <p className="text-3xl font-bold text-primary-400">Easy</p>
            <p className="mt-2 text-gray-400">To Use</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Banner
