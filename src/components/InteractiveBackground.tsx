import React from 'react';
import { useSite } from '../context/SiteContext';

const EARTH_IMAGE = 'https://nmolabs-cdn.b-cdn.net/NmoLabs-official-website/projects/nbos/welcome-nbos-screen.jpeg';

export const InteractiveBackground: React.FC = () => {
  const { config } = useSite();
  return (
    <div className="nmolabs-cinematic-backdrop" data-theme={config.theme} aria-hidden="true">
      <div className="nmolabs-cinematic-image" style={{ backgroundImage: `url("${EARTH_IMAGE}")` }} />
      <div className="nmolabs-cinematic-shade" />
      <div className="nmolabs-cinematic-stars" />
      <div className="nmolabs-cinematic-meteor nmolabs-cinematic-meteor-one" />
      <div className="nmolabs-cinematic-meteor nmolabs-cinematic-meteor-two" />
    </div>
  );
};
