import React from 'react';
import { cn } from '../../utils/cn';

interface GlassyBackgroundProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'info';
  intensity?: 'light' | 'medium' | 'strong';
  className?: string;
}

export function GlassyBackground({
  children,
  variant = 'primary',
  intensity = 'medium',
  className
}: GlassyBackgroundProps) {
  const getVariantStyles = () => {
    const intensityMap = {
      light: { bg: '5', border: '20' },
      medium: { bg: '10', border: '30' },
      strong: { bg: '20', border: '40' }
    };

    const { bg, border } = intensityMap[intensity];

    switch (variant) {
      case 'primary':
        return `bg-blue-${bg}/10 border-blue-${border}/20 backdrop-blur-sm`;
      case 'secondary':
        return `bg-purple-${bg}/10 border-purple-${border}/20 backdrop-blur-sm`;
      case 'success':
        return `bg-green-${bg}/10 border-green-${border}/20 backdrop-blur-sm`;
      case 'info':
        return `bg-cyan-${bg}/10 border-cyan-${border}/20 backdrop-blur-sm`;
      default:
        return `bg-white/10 border-white/20 backdrop-blur-sm`;
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg border backdrop-blur-sm shadow-lg',
        getVariantStyles(),
        className
      )}
    >
      {children}
    </div>
  );
}

interface GlassyBlobProps {
  variant?: 'primary' | 'secondary' | 'success' | 'info';
  size?: 'small' | 'medium' | 'large';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export function GlassyBlob({
  variant = 'primary',
  size = 'medium',
  position = 'top-right',
  className
}: GlassyBlobProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'w-32 h-32';
      case 'medium':
        return 'w-48 h-48';
      case 'large':
        return 'w-64 h-64';
      default:
        return 'w-48 h-48';
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0 -translate-x-1/2 -translate-y-1/2';
      case 'top-right':
        return 'top-0 right-0 translate-x-1/2 -translate-y-1/2';
      case 'bottom-left':
        return 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2';
      case 'bottom-right':
        return 'bottom-0 right-0 translate-x-1/2 translate-y-1/2';
      default:
        return 'top-0 right-0 translate-x-1/2 -translate-y-1/2';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-blue-400/20 to-blue-600/10';
      case 'secondary':
        return 'bg-gradient-to-br from-purple-400/20 to-purple-600/10';
      case 'success':
        return 'bg-gradient-to-br from-green-400/20 to-green-600/10';
      case 'info':
        return 'bg-gradient-to-br from-cyan-400/20 to-cyan-600/10';
      default:
        return 'bg-gradient-to-br from-blue-400/20 to-blue-600/10';
    }
  };

  return (
    <div
      className={cn(
        'absolute rounded-full blur-3xl pointer-events-none',
        getSizeStyles(),
        getPositionStyles(),
        getVariantStyles(),
        className
      )}
    />
  );
}