import { ConfigPlugin, withXcodeProject } from '@expo/config-plugins';
import { ensureDirectoryExists, moveAnimationFilesToNative } from './utils';

const path = require('path');

const withRive: ConfigPlugin<undefined> = (config, _) => {
  return withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;
    const projectPath = config.modRequest.projectRoot;
    const assetsPath = path.join(projectPath, 'ios', 'Assets');

    // Create assets directory and move all animations
    ensureDirectoryExists(assetsPath);
    moveAnimationFilesToNative(assetsPath, xcodeProject);
    console.log('Animations have been moved to native project succefssully !');

    return config;
  });
};

export default withRive;
