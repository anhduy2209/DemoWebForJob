import { Building, Camera, Mail, MapPin, Phone, Save } from 'lucide-react';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { defaultUser } from '../data/user';
import { UserProfile } from '../types/user';
const UserPage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState<UserProfile>(defaultUser)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfile(prev => ({ ...prev, [name]: value }))
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success('Thông tin đã được cập nhật!')
        setIsEditing(false)
    }

    return (
        <div className="p-4 lg:p-6">
            <Toaster position="top-right" />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-blue-200 to-blue-300" />

                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                            <div className="relative -mt-20 lg:-mt-24">
                                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white overflow-hidden">
                                    <img
                                        src={profile.avatar}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isEditing && (
                                    <label className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors">
                                        <Camera className="w-5 h-5" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="flex-1 w-full">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="text-2xl font-bold text-gray-800 bg-transparent border-0 focus:ring-0 disabled:cursor-default p-0"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profile.email}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="flex-1 text-gray-600 bg-transparent border-0 focus:ring-0 disabled:cursor-default p-0"
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={profile.phone}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="flex-1 text-gray-600 bg-transparent border-0 focus:ring-0 disabled:cursor-default p-0"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={profile.address}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="flex-1 text-gray-600 bg-transparent border-0 focus:ring-0 disabled:cursor-default p-0"
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Building className="w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={profile.company}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="flex-1 text-gray-600 bg-transparent border-0 focus:ring-0 disabled:cursor-default p-0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="flex justify-end mt-6">
                                            <button
                                                type="submit"
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                                            >
                                                <Save className="w-4 h-4" />
                                                Lưu thay đổi
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage