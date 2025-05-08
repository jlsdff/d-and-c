const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

let config = getDefaultConfig(__dirname)
config.resolver.sourceExts.push('cjs');
config = wrapWithReanimatedMetroConfig(config)

module.exports = withNativeWind(config, { input: './app/global.css' })

