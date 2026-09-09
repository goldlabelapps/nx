function readPackage(pkg, context) {
  if (pkg.dependencies && pkg.dependencies['@goldlabelapps/flash'] === 'workspace:*') {
    pkg.dependencies['@goldlabelapps/flash'] = '^3.2.8';
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
