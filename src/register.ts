import { window as globalWindow } from 'global';
import { addons } from '@storybook/addons';
import { STORY_CHANGED, STORY_ERRORED, STORY_MISSING } from '@storybook/core-events';

import ReactGA from 'react-ga4';

declare global {
  interface Window {
    STORYBOOK_GA_OPTIONS: object
  }
}

addons.register('storybook/google-analytics', (api) => {
  ReactGA.initialize(globalWindow.STORYBOOK_GA_ID, globalWindow.STORYBOOK_REACT_GA_OPTIONS);

  if (window.STORYBOOK_GA_OPTIONS && 'set' in window.STORYBOOK_GA_OPTIONS) {
    // Sets a single field and value pair or a group of field/value pairs on a tracker object.
    // @see https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#set
    ReactGA.set(window.STORYBOOK_GA_OPTIONS.set);
  }

  api.on(STORY_CHANGED, () => {
    const { path } = api.getUrlState();
    ReactGA.send({ hitType: "pageview", page: path });
  });
  api.on(STORY_ERRORED, ({ description }: { description: string }) => {
    ReactGA.event("exception", {
      description,
      fatal: true,
    });
  });
  api.on(STORY_MISSING, (id: string) => {
    ReactGA.event("exception", {
      description: `attempted to render ${id}, but it is missing`,
      fatal: false,
    });
  });
});
