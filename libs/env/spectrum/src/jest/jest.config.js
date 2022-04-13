/*
 * Copyright 2022 Watheia Labs, LLC. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// Override the Jest config to ignore transpiling from specific folders
// See the base Jest config: https://bit.cloud/teambit/react/react/~code/jest/jest.config.js

// const reactJestConfig = require('@teambit/react/jest/jest.config');
// uncomment the line below and install the package if you want to use this function
// const {
//   generateNodeModulesPattern,
// } = require('@teambit/dependencies.modules.packages-excluder');
// const packagesToExclude = ['@my-org', 'my-package-name'];

// module.exports = {
//   ...reactJestConfig,
//   transformIgnorePatterns: [
//     '^.+\.module\.(css|sass|scss)$',
//     generateNodeModulesPattern({ packages: packagesToExclude }),
//   ],
// };
