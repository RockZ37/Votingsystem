import { formatDate, truncate } from '@/utils/helper'
import { PollStruct } from '@/utils/types'
import Image from 'next/image'
import React from 'react'
import { MdModeEdit, MdDelete, MdHowToVote, MdPeople } from 'react-icons/md'
import { BiTime, BiCalendar } from 'react-icons/bi'
import { motion } from 'framer-motion'

const Details: React.FC<{ poll: PollStruct }> = ({ poll }) => {
  const wallet = '' // modify later
  const now = Date.now()
  const isActive = now >= poll.startsAt && now < poll.endsAt
  const isUpcoming = now < poll.startsAt
  const isEnded = now >= poll.endsAt

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          width={1200}
          height={400}
          src={poll.image}
          alt={poll.title}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">{poll.title}</h1>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              isActive ? 'bg-green-500/20 text-green-400' :
              isUpcoming ? 'bg-primary-500/20 text-primary-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {isActive ? 'Active' : isUpcoming ? 'Upcoming' : 'Ended'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-200 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
              <BiCalendar className="text-primary-400 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Timeline</p>
              <p className="text-white">
                {formatDate(poll.startsAt)} - {formatDate(poll.endsAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
              <MdHowToVote className="text-primary-400 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Votes</p>
              <p className="text-white">{poll.votes} votes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
              <MdPeople className="text-primary-400 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Contestants</p>
              <p className="text-white">{poll.contestants} participants</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">About this poll</h2>
          <p className="text-gray-400 leading-relaxed">{poll.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-dark-300 px-4 py-2 rounded-full">
            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
              <span className="text-xs text-primary-400">
                {truncate({ text: poll.director, startChars: 2, endChars: 2, maxLength: 4 })}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Created by</p>
              <p className="text-sm text-white">
                {truncate({ text: poll.director, startChars: 4, endChars: 4, maxLength: 11 })}
              </p>
            </div>
          </div>

          {wallet && wallet === poll.director && poll.votes < 1 && (
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors"
              >
                <MdModeEdit size={20} />
                <span>Edit poll</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                <MdDelete size={20} />
                <span>Delete poll</span>
              </button>
            </div>
          )}

          {poll.votes < 1 && (
            <button className="ml-auto px-6 py-2 rounded-full bg-primary-500 hover:bg-primary-400 text-white transition-all duration-300">
              Contest Poll
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Details
