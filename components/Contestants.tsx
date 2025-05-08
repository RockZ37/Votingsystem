import { truncate } from '@/utils/helper'
import { ContestantStruct, PollStruct } from '@/utils/types'
import Image from 'next/image'
import React from 'react'
import { BiUpvote } from 'react-icons/bi'
import { motion } from 'framer-motion'

const Contestants: React.FC<{ contestants: ContestantStruct[]; poll: PollStruct }> = ({
  contestants,
  poll,
}) => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet the Contestants</h2>
          <p className="mt-2 text-gray-400">Vote for your favorite contestant in this poll</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contestants.map((contestant, i) => (
            <Contestant 
              key={i} 
              poll={poll} 
              contestant={contestant}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const Contestant: React.FC<{ 
  contestant: ContestantStruct
  poll: PollStruct
  initial: any
  animate: any
  transition: any
}> = ({ contestant, poll, ...motionProps }) => {
  const wallet = '' // modify later

  const voteContestant = async () => {
    console.log(poll, contestant)
  }

  const votingDisabled = !wallet || contestant.voters.includes(wallet) || poll.voters.includes(wallet)
  const hasVoted = wallet && contestant.voters.includes(wallet)

  return (
    <motion.div 
      {...motionProps}
      className="bg-dark-200 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
    >
      <div className="relative aspect-video">
        <Image
          className="w-full h-full object-cover"
          width={600}
          height={400}
          src={contestant.image}
          alt={contestant.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 to-transparent" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">{contestant.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-6 h-6 rounded-full bg-dark-300 flex items-center justify-center">
                <span className="text-xs text-gray-400">
                  {truncate({ text: contestant.voter, startChars: 2, endChars: 2, maxLength: 4 })}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                {truncate({ text: contestant.voter, startChars: 4, endChars: 4, maxLength: 11 })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-dark-300 px-3 py-1 rounded-full">
            <BiUpvote className={contestant.votes > 0 ? 'text-primary-400' : 'text-gray-500'} />
            <span className="text-sm font-medium text-white">{contestant.votes}</span>
          </div>
        </div>

        <button
          onClick={voteContestant}
          disabled={votingDisabled}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
            hasVoted
              ? 'bg-primary-500/20 text-primary-400 cursor-not-allowed'
              : votingDisabled
              ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-400'
          }`}
        >
          {hasVoted ? 'Already Voted' : votingDisabled ? 'Voting Disabled' : 'Vote Now'}
        </button>
      </div>
    </motion.div>
  )
}

export default Contestants
