import { ArrowRight, Lock, Mail, Phone } from 'lucide-react'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type LoginMethod = 'email' | 'phone'

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [loginMethod, setLoginMethod] = useState<LoginMethod>('email')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const navigate = useNavigate()

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    }

    const validateVietnamesePhone = (phone: string) => {
        return phone.match(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (loginMethod === 'email') {
            if (!validateEmail(email)) {
                toast.error('Email không hợp lệ')
                return
            }
            if (password.length < 6) {
                toast.error('Mật khẩu phải có ít nhất 6 ký tự')
                return
            }
            toast.success(isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công!')
            setTimeout(() => navigate('/home'), 1000)
        } else {
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
                toast.success('Xác thực thành công!')
                setTimeout(() => navigate('/home'), 1000)
            }
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

                <div className="flex gap-4 mb-6">
                    <button
                        className={`flex-1 py-2 rounded-lg font-medium transition-colors shadow-md ${loginMethod === 'email'
                            ? 'bg-blue-400 hover:bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => {
                            setLoginMethod('email')
                            setShowOtp(false)
                        }}
                    >
                        <Mail className="inline-block w-4 h-4 mr-2" />
                        Email
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg font-medium transition-colors shadow-md ${loginMethod === 'phone'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => {
                            setLoginMethod('phone')
                            setShowOtp(false)
                        }}
                    >
                        <Phone className="inline-block w-4 h-4 mr-2" />
                        Số điện thoại
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {loginMethod === 'email' ? (
                        <>
                            <div className="relative shadow-xs">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="relative shadow-xs">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-2xl"
                    >
                        {isLogin
                            ? loginMethod === 'phone' && !showOtp
                                ? 'Gửi mã OTP'
                                : 'Đăng nhập'
                            : 'Đăng ký'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
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
