function readPackage(pkg, context) {
  if (pkg.dependencies && pkg.dependencies['@goldlabelapps/uberedux'] === 'workspace:*') {
    pkg.dependencies['@goldlabelapps/uberedux'] = '^3.2.8';
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
