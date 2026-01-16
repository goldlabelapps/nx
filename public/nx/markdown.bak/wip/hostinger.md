---
order: 999
title: hostinger
description: 
slug: /hostinger
icon: server
tags: hostinger, hosting, magento, e-commerce
---

https://www.hostinger.com/

https://www.hostinger.com/support/8999410-how-to-use-the-magento-2-vps-template-at-hostinger/

How to Use the Magento 2 VPS Template at Hostinger
Getting started with the Magento 2 VPS Template

Updated 5 months ago
Magento 2 is a powerful, open-source eCommerce platform that offers extensive features for online merchants with the flexibility to customize their online store. 

With Hostinger’s Ubuntu 24.04 64bit With Magento 2 VPS template, launching an eCommerce site is more straightforward, as Magento 2 comes pre-installed on the server.



To explore the tailored hosting solutions, visit our Magento VPS page.



This guide will walk you through the basic steps to get your Magento 2 store up and running.



Accessing Your Magento 2 Store
Open a web browser and visit https://[your-VPS-hostname]/admin/ — make sure to replace [your-VPS-hostname] with the actual hostname of your VPS.



You’ll be directed to the Magento 2 admin page:

In the Ursername field, insert admin 

In the Password field, insert the password you entered when installing the template:

Configuring Your Store
In the Magento admin panel, navigate to Stores → Configuration to customize your store details, such as name, address, and default language:

Customizing Your Store’s Design
Magento 2 offers several themes to choose from. You can select and customize a theme by navigating to Content → Design Configuration:

For more in-depth customization, Magento allows you to add custom CSS and JavaScript.



Adding Products
Navigate to Catalog → Products in the admin panel. Here, you can add new products, their descriptions, images, pricing, and other details.



Organize your products into categories for easier navigation by going to Catalog → Categories.



Setting Up Payment and Shipping
Magento supports a variety of payment methods. Set these up under Stores → Configuration → Sales → Payment Methods:

Configure your shipping methods and rates under Stores → Configuration → Sales → Shipping Settings.



Customizing Magento with Extensions
Visit the Magento Marketplace to find extensions that add functionality or integrate third-party services with your store. Extensions can be installed via Web Setup Wizard in your Magento admin panel, or manually using Composer:

php8.2 ~/htdocs/YOUR-DOMAIN/bin/magento
NOTE

This template uses CloudPanel, which runs an NGINX web server. For specific plugins, you might need to edit vhost files

For further information and troubleshooting, refer to the official Magento 2 User Guide 💡

