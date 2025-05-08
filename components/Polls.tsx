/* eslint-disable @next/next/no-img-element */
import { formatDate, truncate } from '@/utils/helper'
import { PollStruct } from '@/utils/types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { BiTime } from 'react-icons/bi'
import { MdHowToVote } from 'react-icons/md'

const Polls: React.FC<{ polls: PollStruct[] }> = ({ polls }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, active, upcoming, ended

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poll.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const now = Date.now()
    const isActive = now >= poll.startsAt && now < poll.endsAt
    const isUpcoming = now < poll.startsAt
    const isEnded = now >= poll.endsAt

    switch (filter) {
      case 'active': return matchesSearch && isActive
      case 'upcoming': return matchesSearch && isUpcoming
      case 'ended': return matchesSearch && isEnded
      default: return matchesSearch
    }
  })

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Active Polls
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Browse and participate in ongoing polls or create your own poll to gather community feedback.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-7xl mx-auto px-4">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search polls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-dark-200 border border-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'active', 'upcoming', 'ended'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full capitalize ${
                filter === option
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-200 text-gray-400 hover:bg-dark-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
        {filteredPolls.map((poll, i) => (
          <Poll key={i} poll={poll} />
        ))}
      </div>
    </div>
  )
}

const Poll: React.FC<{ poll: PollStruct }> = ({ poll }) => {
  const navigate = useRouter()
  const now = Date.now()
  const isActive = now >= poll.startsAt && now < poll.endsAt
  const isUpcoming = now < poll.startsAt
  const isEnded = now >= poll.endsAt

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-200 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 aspect-square md:aspect-auto relative">
          <div className="grid grid-cols-2 gap-2 p-4">
            {[...poll.avatars, '/assets/images/question.jpeg', '/assets/images/question.jpeg']
              .slice(0, 4)
              .map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt="contestant"
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{poll.title}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {truncate({ text: poll.description, startChars: 100, endChars: 0, maxLength: 103 })}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isActive ? 'bg-green-500/20 text-green-400' :
              isUpcoming ? 'bg-primary-500/20 text-primary-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {isActive ? 'Active' : isUpcoming ? 'Upcoming' : 'Ended'}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <BiTime className="text-primary-400" />
              <span>{formatDate(poll.startsAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MdHowToVote className="text-primary-400" />
              <span>{poll.votes} votes</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-dark-300 flex items-center justify-center">
                <span className="text-xs text-gray-400">
                  {truncate({ text: poll.director, startChars: 2, endChars: 2, maxLength: 4 })}
                </span>
              </div>
              <span className="text-sm text-gray-400">Director</span>
            </div>

            <button
              onClick={() => navigate.push('/polls/' + poll.id)}
              className="px-6 py-2 rounded-full bg-primary-500 hover:bg-primary-400 text-white transition-all duration-300"
            >
              View Poll
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Polls
