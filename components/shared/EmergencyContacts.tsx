'use client'

import { useState, useEffect } from 'react'
import { Plus, X, Copy, User, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { formatAddress } from '@/lib/utils/format'

interface Contact {
  id: string
  name: string
  address: string
  phone?: string
  nickname?: string
}

export function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    address: '',
    phone: '',
    nickname: '',
  })

  useEffect(() => {
    // Load contacts from localStorage
    const savedContacts = localStorage.getItem('minisente-contacts')
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts))
      } catch (error) {
        console.error('Failed to load contacts:', error)
      }
    }
  }, [])

  const saveContacts = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts)
    localStorage.setItem('minisente-contacts', JSON.stringify(updatedContacts))
  }

  const handleAddContact = () => {
    if (!newContact.name || !newContact.address) {
      toast.error('Name and address are required')
      return
    }

    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact,
    }

    saveContacts([...contacts, contact])
    setNewContact({ name: '', address: '', phone: '', nickname: '' })
    setShowAddForm(false)
    toast.success('Contact added successfully')
  }

  const handleDeleteContact = (id: string) => {
    saveContacts(contacts.filter(c => c.id !== id))
    toast.success('Contact removed')
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast.success('Address copied to clipboard')
  }

  const handleSendToContact = (contact: Contact) => {
    // This would typically navigate to send page with pre-filled address
    window.location.href = `/send?to=${contact.address}`
  }

  return (
    <div className="glass-morphism rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Emergency Contacts</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="p-2 bg-gradient-to-r from-primary-blue to-primary-teal rounded-lg hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
          <h4 className="text-white font-medium mb-4">Add New Contact</h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Wallet Address (0x...)"
              value={newContact.address}
              onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Phone Number (optional)"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Nickname (optional)"
              value={newContact.nickname}
              onChange={(e) => setNewContact({ ...newContact, nickname: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddContact}
                className="flex-1 py-2 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:scale-105 transition-all duration-200"
              >
                Add Contact
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No contacts saved yet</p>
          <p className="text-sm text-gray-500">Add frequently used addresses for quick access</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-teal rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {contact.nickname || contact.name}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    {formatAddress(contact.address)}
                  </p>
                  {contact.phone && (
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {contact.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendToContact(contact)}
                  className="px-3 py-1 bg-gradient-to-r from-accent-green to-primary-teal text-white text-xs rounded-full hover:scale-105 transition-all duration-200"
                >
                  Send
                </button>
                <button
                  onClick={() => handleCopyAddress(contact.address)}
                  className="p-1 bg-white/10 rounded hover:bg-white/20 transition-colors"
                >
                  <Copy className="w-3 h-3 text-gray-400" />
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-1 bg-white/10 rounded hover:bg-red-500/20 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400 text-center">
          Contacts are stored locally on your device
        </p>
      </div>
    </div>
  )
}
