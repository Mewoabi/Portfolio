import { cn } from '../../utils/cn';

interface SectionDividerProps {
  variant?: 'gradient' | 'dots' | 'wave' | 'simple';
  className?: string;
  showGlow?: boolean;
}

export function SectionDivider({
  variant = 'gradient',
  className,
  showGlow = true
}: SectionDividerProps) {
  
  if (variant === 'gradient') {
    return (
      <div className={cn('relative py-8 md:py-12', className)}>
        {/* Glowing gradient line */}
        <div className="relative w-full h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent">
          {showGlow && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-400/30 to-transparent blur-sm" />
          )}
        </div>
        
        {/* Center accent */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-primary-400 rounded-full opacity-60">
            {showGlow && (
              <div className="absolute inset-0 bg-primary-400 rounded-full blur-sm animate-pulse" />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('relative py-8 md:py-12', className)}>
        <div className="flex justify-center items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-1.5 h-1.5 rounded-full bg-primary-400/40 transition-all duration-300',
                i === 2 && 'w-2 h-2 bg-primary-500/60',
                showGlow && 'shadow-sm shadow-primary-400/50'
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={cn('relative py-8 md:py-12 overflow-hidden', className)}>
        <svg
          className="w-full h-4 text-primary-400/30"
          viewBox="0 0 400 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10 Q 100 0 200 10 T 400 10"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          {showGlow && (
            <path
              d="M0 10 Q 100 0 200 10 T 400 10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              opacity="0.2"
              className="blur-sm"
            />
          )}
        </svg>
      </div>
    );
  }

  // Simple variant
  return (
    <div className={cn('relative py-8 md:py-12', className)}>
      <div className="max-w-xs mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
      </div>
    </div>
  );
}

// Decorative section header component
interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
  showDivider?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  showDivider = true
}: SectionHeaderProps) {
  if (!title && !subtitle && !showDivider) return null;

  return (
    <div className={cn('text-center', className)}>
      {showDivider && <SectionDivider variant="gradient" />}
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 dark:from-gray-100 dark:via-primary-400 dark:to-gray-100 bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}