import { ArrowRight, Lock, Phone } from 'lucide-react'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const navigate = useNavigate()

    const validateVietnamesePhone = (phone: string) => {
        return phone.match(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateVietnamesePhone(phone)) {
            toast.error('Số điện thoại không hợp lệ')
            return
        }

        if (!showOtp) {
            setShowOtp(true)
            toast.success('Mã OTP đã được gửi!')
        } else {
            if (otp.length !== 6) {
                toast.error('Mã OTP không hợp lệ')
                return
            }
            toast.success(isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công!')
            setTimeout(() => navigate('/dashboard'), 1000)
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Toaster position="top-right" />
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                    </h1>
                    <p className="text-gray-600">
                        {isLogin ? 'Chào mừng bạn trở lại!' : 'Tạo tài khoản mới'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative shadow-xs">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="tel"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {showOtp && (
                        <div className="relative shadow-xs">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-2xl"
                    >
                        {isLogin && !showOtp ? 'Gửi mã OTP' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setShowOtp(false)
                            setPhone('')
                            setOtp('')
                        }}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
