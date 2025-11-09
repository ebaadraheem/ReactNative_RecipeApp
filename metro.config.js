// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

// 1. Get the default Expo config
let config = getDefaultConfig(__dirname);

// 2. APPLY THE FIREBASE FIXES TO THE CONFIG (CRUCIAL!)
// This ensures Metro handles the Firebase SDK's .cjs files correctly
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

// 3. Apply the NativeWind wrapper
module.exports = withNativeWind(config, { input: './global.css' });