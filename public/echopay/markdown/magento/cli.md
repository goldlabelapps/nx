---
order: 50
slug: /magento/cli
title: CLI
description: Command Line Interface
icon: terminal
tags: echopay, terminal, api, magento
smartImage: magento
---
# Magento CLI

Magento CLI operations can sometimes fail or leave the system in an inconsistent state, especially when importing sample data or after interrupted upgrades. Here are some common issues and recovery steps:

### Common Issues
- Sample data patch errors (e.g., "Rolled back transaction has not been completed correctly")
- File or directory permission errors (e.g., "permission is read-only")
- Missing static content or broken frontend/admin

### Recovery Steps
1. **Check logs for errors:**
	- `var/log/exception.log`
	- `var/log/system.log`

2. **Fix permissions:**
	```sh
	chmod -R 777 var generated pub/static pub/media
	```

3. **Regenerate static content:**
	```sh
	php bin/magento setup:static-content:deploy -f
	```

4. **Flush cache:**
	```sh
	php bin/magento cache:flush
	```

5. **Remove failed patch from database (if needed):**
	- Get DB credentials from `app/etc/env.php`.
	- Connect to MySQL:
	  ```sh
	  mysql -u <db_user> -p'<db_password>' -e "USE <db_name>; DELETE FROM patch_list WHERE patch_name = 'Magento\\CatalogSampleData\\Setup\\Patch\\Data\\InstallCatalogSampleData';"
	  ```
	- Rerun:
	  ```sh
	  php bin/magento setup:upgrade
	  php bin/magento cache:flush
	  ```

### Best Practices
- Always back up your database and files before major changes.
- Avoid running CLI commands as root unless necessary.
- Ensure correct permissions (preferably the web server user, e.g., www-data).
- Monitor logs for early signs of trouble.

If you encounter persistent issues, check the logs for specific errors and follow the above steps. Document any unique errors and solutions for future reference.
## Importing Magento Sample Data

To import a sample store (including images and products) into Magento, follow these steps in your SSH session, inside the Magento root directory:

1. Deploy the sample data:
	```sh
	php bin/magento sampledata:deploy
	```

2. Upgrade the setup to register the sample data modules:
	```sh
	php bin/magento setup:upgrade
	```

This will import sample products, categories, and images into your Magento store. You can then reindex and clear cache if needed:

```sh
php bin/magento indexer:reindex
php bin/magento cache:flush
```

After these steps, visit your store frontend to see the sample data.

# Magento CLI

The best way to deal with Magento is with the CLI. 

## Connecting to the Magento VPS

To manage your Magento installation, first SSH into your VPS and change to the Magento root directory:

```sh
ssh root@31.97.113.89
cd /home/user/htdocs/srv1269941.hstgr.cloud
```

You should now be in the main Magento directory, where you can run Magento CLI commands (e.g., `bin/magento`).

```sh
ssh root@31.97.113.89
cd /home/user/htdocs/srv1269941.hstgr.cloud
ls -l
```

