interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  disabled,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold tracking-tight rounded-md transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-900'
  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-[0_8px_20px_-10px_rgba(22,163,74,0.65)] hover:-translate-y-px active:translate-y-0',
    secondary:
      'bg-surface-100/90 text-surface-700 hover:bg-surface-200/90 dark:bg-surface-700/90 dark:text-surface-100 dark:hover:bg-surface-600 border border-surface-200/80 dark:border-surface-600/80',
    ghost:
      'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-950/40',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
