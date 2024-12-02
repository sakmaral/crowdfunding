const CrowdFunding = artifacts.require('CrowdFunding');
module.exports = function (_deployer) {
  _deployer.deploy(CrowdFunding);
};
