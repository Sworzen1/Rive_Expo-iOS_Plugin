import { XcodeProject } from '@expo/config-plugins';

const fs = require('fs');
const path = require('path');

const TARGETS_DIR = path.join(__dirname, 'targets');

export function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

export function moveAnimationFilesToNative(
  assetsPath: string,
  xcodeProject: XcodeProject
) {
  const animationFiles = fs.readdirSync(TARGETS_DIR);
  const mainTarget = xcodeProject.getFirstTarget().uuid;
  const mainGroup = xcodeProject.getFirstProject().firstProject.mainGroup;

  const assetsPbxGroup = xcodeProject.addPbxGroup([], 'Assets', 'Assets');

  xcodeProject.addToPbxGroup(assetsPbxGroup.uuid, mainGroup);

  animationFiles.map((file: string) => {
    const sourceFile = path.join(__dirname, 'targets', file);
    const fileContent = fs.readFileSync(sourceFile);

    const fileRef = xcodeProject.addFile(sourceFile, assetsPbxGroup.uuid);

    const buildFileUUID = xcodeProject.generateUuid();
    xcodeProject.pbxBuildFileSection()[buildFileUUID] = {
      isa: 'PBXBuildFile',
      fileRef: fileRef.fileRef,
      fileRef_comment: file,
    };

    xcodeProject.pbxBuildFileSection()[
      buildFileUUID + '_comment'
    ] = `${file} in Resources`;

    const resourcesBuildPhase =
      xcodeProject.pbxResourcesBuildPhaseObj(mainTarget);

    resourcesBuildPhase.files.push({
      value: buildFileUUID,
      comment: `${file} in Resources`,
    });

    fs.writeFileSync(path.join(assetsPath, file), fileContent);
  });
}
