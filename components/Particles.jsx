import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

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
          value: ['#ffffff', '#BB000E', '#E31C25'],
        },
        links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.05,
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
          value: { min: 0.1, max: 0.4 },
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
    []
  );

  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return null;
};

export default ParticlesBackground;


