---
order: 50
slug: /magento/ssh
title: SSH
description: SSH Key for Magento VPS (Hostinger)
icon: terminal
tags: echopay, terminal, api, magento, ssh
smartImage: magento
---
# SSH

> Set up your SSH Key for Magento VPS (Hostinger)

Setting up an SSH key lets you connect to your Magento VPS on Hostinger securely, without needing to enter your password every time (which often doesn't work anyway). It's more secure and convenient, even if it feels a bit intimidating at first. Here’s how to do it:

## Why Use SSH Keys?

- **No password hassle:** You won’t need to type your password every time you connect.

- **Better security:** Passwords can be guessed or stolen; SSH keys are much harder to compromise.

- **Required by Hostinger:** Password login may not work, so keys are the recommended method.

## Step-by-Step Guide

### 1. Generate an SSH Key on Your Mac
Open Terminal and run:

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Press Enter to accept the default file location. You can set a passphrase for extra security, or just press Enter for none.

### 2. Copy Your Public Key
Run:

```sh
cat ~/.ssh/id_ed25519.pub
```

Copy the output (the long string starting with `ssh-ed25519`).

### 3. Add Your Key to Hostinger

Login to Hostinger as goldlabel.apps@gmail.com 

Go to the [Hostinger control panel](https://hpanel.hostinger.com/vps/1269941/settings)

- Add new key
- Paste your public key into the provided field and save.

### 4. Connect to Your VPS
In Terminal, connect using:

```sh
ssh root@31.97.113.89
```

You should connect without needing a password. If you ever lose your key, you can generate a new one and repeat the process. If you’re unsure, ask for help—this is a common setup for developers