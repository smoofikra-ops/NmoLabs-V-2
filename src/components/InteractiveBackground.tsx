import React from 'react';
import { useSite } from '../context/SiteContext';

// A single atmospheric layer shared by the homepage and inner routes.
// Decorative only: no heavy WebGL, no input capture, reduced-motion friendly.
const stars = Array.from({ length: 84 }, (_, i) => ({
  x: (i * 73.79 + (i % 7) * 19.17) % 100,
  y: (i * 37.31 + (i % 11) * 13.07) % 100,
  size: i % 11 === 0 ? 3 : i % 4 === 0 ? 2 : 1,
  delay: (i % 19) * -0.47,
  duration: 3 + (i % 8) * 0.71,
}));

const cityLights = Array.from({ length: 78 }, (_, i) => ({
  x: 19 + ((i * 29.71 + Math.sin(i * 2.1) * 10) % 64),
  y: 21 + ((i * 17.93 + Math.cos(i * 1.8) * 9) % 55),
  size: i % 8 === 0 ? 3 : 1.4,
}));

export const InteractiveBackground: React.FC = () => {
  const { config } = useSite();
  return (
    <div className="nmolabs-cosmos" aria-hidden="true" data-theme={config.theme}>
      <div className="nmolabs-cosmos-haze" />
      <div className="nmolabs-cosmos-stars">
        {stars.map((star, i) => (
          <span
            key={i}
            className="nmolabs-cosmos-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>
      <div className="nmolabs-cosmos-nebula" />
      <div className="nmolabs-cosmos-planet nmolabs-cosmos-planet-far" />
      <div className="nmolabs-cosmos-earth" role="presentation">
        <div className="nmolabs-earth-nightshade" />
        <div className="nmolabs-earth-contours" />
        <div className="nmolabs-earth-meridians" />
        <div className="nmolabs-earth-citylights">
          {cityLights.map((light,i) => (
            <span key={i} style={{
              left: `${light.x}%`,
              top: `${light.y}%`,
              width: light.size,
              height: light.size,
            }} />
          ))}
        </div>
        <div className="nmolabs-earth-glint" />
      </div>
      <span className="nmolabs-meteor nmolabs-meteor-one" />
      <span className="nmolabs-meteor nmolabs-meteor-two" />
      <span className="nmolabs-meteor nmolabs-meteor-three" />
      <div className="nmolabs-cosmos-vignette" />
    </div>
  );
};