import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '@hooks/useTheme';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.3,
              color: '#BB000E',
            },
          },
        },
      },
      particles: {
        color: {
          value: isDark
            ? ['#ffffff', '#BB000E', '#E31C25']
            : ['#1a1a2e', '#BB000E', '#E31C25'],
        },
        links: {
          color: isDark ? '#ffffff' : '#1a1a2e',
          distance: 150,
          enable: true,
          opacity: isDark ? 0.05 : 0.08,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 40,
        },
        opacity: {
          value: isDark ? { min: 0.1, max: 0.4 } : { min: 0.15, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [isDark]
  );

  if (init) {
    return <Particles id="tsparticles" key={theme} options={options} />;
  }

  return null;
};

export default ParticlesBackground;


