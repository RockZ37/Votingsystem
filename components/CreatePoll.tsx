import { PollParams } from '@/utils/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { MdCloudUpload, MdTitle, MdDescription, MdTimer } from 'react-icons/md'

const CreatePoll: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [poll, setPoll] = useState<PollParams>({
    image: '',
    title: '',
    description: '',
    startsAt: '',
    endsAt: '',
  })

  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPoll(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'image' && value) {
      try {
        new URL(value)
        setImagePreview(value)
        setError('')
      } catch {
        setError('Please enter a valid image URL')
      }
    }

    // Validate dates
    if ((name === 'startsAt' || name === 'endsAt') && poll.startsAt && poll.endsAt) {
      const start = new Date(poll.startsAt).getTime()
      const end = new Date(poll.endsAt).getTime()
      if (end <= start) {
        setError('End date must be after start date')
      } else {
        setError('')
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!poll.image || !poll.title || !poll.description || !poll.startsAt || !poll.endsAt) {
      setError('Please fill in all fields')
      return
    }

    try {
      new URL(poll.image)
    } catch {
      setError('Please enter a valid image URL')
      return
    }

    const start = new Date(poll.startsAt).getTime()
    const end = new Date(poll.endsAt).getTime()
    if (end <= start) {
      setError('End date must be after start date')
      return
    }

    console.log({
      ...poll,
      startsAt: start,
      endsAt: end,
    })
    handleClose()
  }

  const handleClose = () => {
    setPoll({
      image: '',
      title: '',
      description: '',
      startsAt: '',
      endsAt: '',
    })
    setImagePreview('')
    setError('')
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
            className="w-full max-w-lg bg-dark-200 rounded-2xl shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Create New Poll</h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-dark-300 transition-colors"
                >
                  <FaTimes className="text-gray-400" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    <div className="flex items-center gap-2">
                      <MdTitle className="text-primary-400" />
                      Poll Title
                    </div>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={poll.title}
                    onChange={handleChange}
                    placeholder="Enter poll title"
                    className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-gray-700 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    <div className="flex items-center gap-2">
                      <MdDescription className="text-primary-400" />
                      Poll Description
                    </div>
                  </label>
                  <textarea
                    name="description"
                    value={poll.description}
                    onChange={handleChange}
                    placeholder="Describe your poll"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-gray-700 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      <div className="flex items-center gap-2">
                        <MdTimer className="text-primary-400" />
                        Start Date
                      </div>
                    </label>
                    <input
                      type="datetime-local"
                      name="startsAt"
                      value={poll.startsAt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-gray-700 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      <div className="flex items-center gap-2">
                        <MdTimer className="text-primary-400" />
                        End Date
                      </div>
                    </label>
                    <input
                      type="datetime-local"
                      name="endsAt"
                      value={poll.endsAt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-gray-700 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    <div className="flex items-center gap-2">
                      <MdCloudUpload className="text-primary-400" />
                      Banner Image URL
                    </div>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={poll.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-gray-700 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                {imagePreview ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-dark-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg bg-dark-300 flex flex-col items-center justify-center text-gray-400">
                    <MdCloudUpload size={40} />
                    <p className="mt-2 text-sm">Banner preview will appear here</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-400 transition-colors"
                >
                  Create Poll
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreatePoll
