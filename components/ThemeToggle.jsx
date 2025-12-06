import React, { forwardRef } from 'react';
import { useTheme } from '@hooks/useTheme';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

const ThemeToggle = forwardRef(({ className = '', animated = true }, ref) => {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div
        ref={ref}
        className={`theme-toggle w-9 h-9 rounded-full opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      ref={ref}
      onClick={toggleTheme}
      className={`theme-toggle group relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${animated ? 'opacity-0' : ''} ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Glass background */}
      <span className="absolute inset-0 rounded-full theme-toggle-bg transition-all duration-300" />

      {/* Glow effect on hover */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 theme-toggle-glow" />

      {/* Icon container with rotation animation */}
      <span className="relative z-10 flex items-center justify-center">
        {/* Sun icon */}
        <span
          className={`absolute transition-all duration-500 ease-out ${
            isDark
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        >
          <RiSunLine className="w-[18px] h-[18px] text-amber-500" />
        </span>

        {/* Moon icon */}
        <span
          className={`absolute transition-all duration-500 ease-out ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        >
          <RiMoonLine className="w-[18px] h-[18px] text-slate-300" />
        </span>
      </span>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
