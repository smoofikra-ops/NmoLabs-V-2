import React from 'react';
import { useSite } from '../context/SiteContext';

export const InteractiveBackground: React.FC = () => {
  const { config } = useSite();
  const isDark = config.theme === 'dark';

  return (
    <div
      className="nmolabs-atmosphere fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      aria-hidden="true"
      data-theme={isDark ? 'dark' : 'light'}
    >
      <div className="nmolabs-atmosphere-base absolute inset-0" />

      {/* Quiet star / data field: visible enough to give depth, never enough to compete with copy. */}
      <div className="nmolabs-atmosphere-stars absolute inset-0" />
      <div className="nmolabs-atmosphere-stars nmolabs-atmosphere-stars-secondary absolute inset-0" />

      {/* Story thread — a subtle path that visually connects the long-form homepage journey. */}
      <div className="nmolabs-story-thread absolute left-1/2 top-[14vh] h-[72vh] w-[min(76vw,1080px)] -translate-x-1/2">
        <span className="nmolabs-story-orbit nmolabs-story-orbit-a" />
        <span className="nmolabs-story-orbit nmolabs-story-orbit-b" />
        <span className="nmolabs-story-node nmolabs-story-node-a" />
        <span className="nmolabs-story-node nmolabs-story-node-b" />
        <span className="nmolabs-story-node nmolabs-story-node-c" />
      </div>

      {/* Earth / global-growth cue. Kept mostly below the fold so it reads as atmosphere, not a hero illustration. */}
      <div className="nmolabs-earth absolute">
        <span className="nmolabs-earth-latitude nmolabs-earth-latitude-a" />
        <span className="nmolabs-earth-latitude nmolabs-earth-latitude-b" />
        <span className="nmolabs-earth-longitude nmolabs-earth-longitude-a" />
        <span className="nmolabs-earth-longitude nmolabs-earth-longitude-b" />
      </div>

      <div className="nmolabs-atmosphere-glow nmolabs-atmosphere-glow-a absolute" />
      <div className="nmolabs-atmosphere-glow nmolabs-atmosphere-glow-b absolute" />
      <div className="nmolabs-atmosphere-readability absolute inset-0" />
    </div>
  );
};
