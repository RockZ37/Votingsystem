import { PollStruct } from '@/utils/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { MdCloudUpload } from 'react-icons/md'

const ContestPoll: React.FC<{ poll: PollStruct; isOpen: boolean; onClose: () => void }> = ({ 
  poll, 
  isOpen,
  onClose 
}) => {
  const [contestant, setContestant] = useState({
    name: '',
    image: '',
  })

  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContestant(prev => ({
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
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!contestant.name || !contestant.image) {
      setError('Please fill in all fields')
      return
    }

    try {
      new URL(contestant.image)
    } catch {
      setError('Please enter a valid image URL')
      return
    }

    console.log(contestant)
    handleClose()
  }

  const handleClose = () => {
    setContestant({ name: '', image: '' })
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
                <h2 className="text-xl font-semibold text-white">Become a Contestant</h2>
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
                    Contestant Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contestant.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-dark-300 border border-gray-700 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={contestant.image}
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
                    <p className="mt-2 text-sm">Image preview will appear here</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-400 transition-colors"
                >
                  Register as Contestant
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContestPoll
