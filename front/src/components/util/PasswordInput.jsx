import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ label, value, onChange, placeholder, id, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2 w-full">
            {/* Label */}
            {label && (
                <label 
                    htmlFor={id} 
                    className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest block px-1"
                >
                    {label}
                </label>
            )}

            {/* Input Wrapper */}
            <div className="relative w-full group">
                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    required
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
                        w-full p-4 pr-12 rounded-2xl transition-all outline-none border-2
                        bg-zinc-100 dark:bg-zinc-800/50 text-text-primary
                        ${error 
                            ? 'border-red-500/50' 
                            : 'border-transparent focus:border-primary/30'
                        }
                    `}
                />

                {/* Eye Button */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1
                               text-zinc-400 hover:text-primary 
                               dark:text-zinc-500 dark:hover:text-primary 
                               transition-colors cursor-pointer flex items-center justify-center"
                >
                    {showPassword ? (
                        <EyeOff size={20} strokeWidth={2.5} />
                    ) : (
                        <Eye size={20} strokeWidth={2.5} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;