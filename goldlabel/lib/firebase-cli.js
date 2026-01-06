#!/usr/bin/env node


const { execSync } = require('child_process');

console.log('\nHello! This is the GoldLabel Firebase CLI helper.');


(async () => {
    const inquirer = await import('inquirer');
    const { action } = await inquirer.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do? (Use ↑/↓ to navigate, Enter to select)',
            choices: [
                { name: 'Deploy Firebase', value: 'deploy' },
                { name: 'Install Firebase CLI', value: 'install' },
                { name: 'Init Firebase (firebase init)', value: 'init' },
            ],
            pageSize: 5,
        },
    ]);

    if (action === 'deploy') {
        console.log('\nDeploying Firebase...');
        execSync('npx firebase deploy --only hosting,firestore,storage,functions --project default', { stdio: 'inherit' });
    } else if (action === 'install') {
        console.log('\nInstalling Firebase CLI tools...');
        execSync('npm install -g firebase-tools', { stdio: 'inherit' });
    } else if (action === 'init') {
        console.log('\nRunning firebase init...');
        execSync('npx firebase init', { stdio: 'inherit' });
    }
})();
