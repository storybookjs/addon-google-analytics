module.exports = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "../preset"
  ],
  core: {
    builder: "webpack5",
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  }
};