import { PollStruct } from '@/utils/types'
import { BsTrash3Fill } from 'react-icons/bs'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const DeletePoll: React.FC<{ poll: PollStruct; isOpen: boolean; onClose: () => void }> = ({
  poll,
  isOpen,
  onClose,
}) => {
  const handleDelete = async () => {
    // TODO: Implement delete functionality
    console.log(poll)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-dark-200 rounded-2xl shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Delete Poll</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-dark-300 transition-colors"
                >
                  <FaTimes className="text-gray-400" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                  <BsTrash3Fill className="text-red-400 text-2xl" />
                </div>

                <h3 className="text-xl font-medium text-white text-center">
                  Are you sure you want to delete this poll?
                </h3>
                
                <p className="text-gray-400 text-center max-w-sm">
                  This action cannot be undone. This will permanently delete the poll
                  <span className="block font-medium text-white mt-2">"{poll?.title}"</span>
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-dark-300 text-white font-medium hover:bg-dark-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Delete Poll
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeletePoll
