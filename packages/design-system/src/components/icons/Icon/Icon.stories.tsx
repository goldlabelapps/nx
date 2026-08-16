import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell, ICON_NAMES, Icon, PageSection } from '../../../index';
import type { IconName } from '../../../index';

type IconCategory = {
  title: string;
  names: IconName[];
};

const categoryOrder = [
  'Navigation',
  'Status',
  'Auth & People',
  'Content & Editing',
  'Media',
  'Social',
  'Transport & Places',
  'Tech & Dev',
  'Business & Work',
  'Brand & Product',
  'Misc',
] as const;

const classifyIcon = (name: IconName): string => {
  if (
    [
      'left',
      'right',
      'up',
      'down',
      'menu',
      'expand',
      'home',
      'search',
      'where',
      'geo',
      'geolocator',
      'fullscreen',
      'backoffice',
      'dashboard',
      'logs',
      'folder',
      'sitemap',
      'copy',
      'preview',
    ].includes(name)
  ) {
    return 'Navigation';
  }

  if (
    [
      'success',
      'warning',
      'error',
      'info',
      'required',
      'notify',
      'notifyr',
      'notifyer',
      'news',
      'stop',
      'cancel',
      'random',
      'tick',
      'star',
      'staron',
      'staroff',
      'features',
      'feature',
      'heart',
      'leaf',
      'prospects',
      'seniority',
    ].includes(name)
  ) {
    return 'Status';
  }

  if (
    [
      'user',
      'users',
      'visitor',
      'visitors',
      'account',
      'members',
      'admin',
      'private',
      'auth',
      'signin',
      'signup',
      'signout',
      'forget',
      'team',
      'clients',
      'company',
      'job',
      'experience',
      'good-fit',
      'speak-write',
    ].includes(name)
  ) {
    return 'Auth & People';
  }

  if (
    [
      'add',
      'new',
      'plus',
      'create',
      'edit',
      'save',
      'delete',
      'doc',
      'files',
      'book',
      'books',
      'pdf',
      'tags',
      'tag',
      'link',
      'share',
      'send',
      'forward',
      'upload',
      'download',
      'about',
      'blog',
      'categories',
      'category',
      'writing',
      'more',
      'close',
      'hide',
      'show',
      'reset',
      'filter',
      'filters',
      'ask',
      'what',
      'how',
      'when',
      'who',
      'why',
    ].includes(name)
  ) {
    return 'Content & Editing';
  }

  if (
    [
      'photo',
      'png',
      'album',
      'flickr',
      'youtube',
      'wordPress',
      'wordpress',
      'web3d',
      'film',
      'desktop',
      'desktopmac',
      'mobile',
      'fish',
      'dog',
      'dessert',
      'cake',
      'asian',
      'food',
      'medical',
      'vape',
      'virus',
      'pool',
      'ski',
      'skiing',
      'scuba',
      'diving',
      'diveshop',
      'activities',
    ].includes(name)
  ) {
    return 'Media';
  }

  if (['github', 'linkedin', 'google', 'facebook', 'twitter', 'whatsapp'].includes(name)) {
    return 'Social';
  }

  if (
    [
      'car',
      'boat',
      'bus',
      'van',
      'bike',
      'scooter',
      'shop',
      'accommodation',
      'bar',
      'public',
      'orders',
      'xbox',
    ].includes(name)
  ) {
    return 'Transport & Places';
  }

  if (
    [
      'techstack',
      'typescript',
      'javascript',
      'js',
      'docker',
      'api',
      'terminal',
      'openai',
      'ai',
      'ki',
      'plugins',
      'plugin',
      'core',
      'firebase',
      'uberedux',
      'design',
      'maths',
      'chrome',
      'firefox',
      'edge',
      'safari',
      'android',
      'iphone',
      'windows',
      'linux',
      'mac',
      'macos',
      'install',
      'boot',
      'pingpong',
      'blockey',
      'blokey',
      'bouncer',
      'seed',
      'ting',
    ].includes(name)
  ) {
    return 'Tech & Dev';
  }

  if (
    [
      'work',
      'case',
      'cases',
      'caseclosed',
      'caseclock',
      'aicase',
      'life',
      'fallmanager',
      'legal',
      'balance',
      'cash',
      'free',
      'tenant',
      'products',
      'example',
      'examples',
      'expertise',
      'rocket',
      'hammer',
      'archive',
      'flagon',
      'flagoff',
      'opensource',
      'flash',
      'oliver',
      'goldlabel',
      'media',
    ].includes(name)
  ) {
    return 'Business & Work';
  }

  if (['web'].includes(name)) {
    return 'Brand & Product';
  }

  return 'Misc';
};

const categories: IconCategory[] = categoryOrder
  .map((title) => {
    const names = ICON_NAMES.filter((name) => classifyIcon(name) === title);
    return { title, names };
  })
  .filter((group) => group.names.length > 0);

async function copyToClipboard(value: string): Promise<boolean> {
  if (typeof navigator === 'undefined') return false;

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const success = document.execCommand('copy');
  document.body.removeChild(textarea);
  return success;
}

function IconGallery() {
  const [copied, setCopied] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const onCopy = React.useCallback(async (name: IconName) => {
    setError('');
    try {
      const success = await copyToClipboard(name);
      if (!success) {
        setError('Clipboard is unavailable in this browser context.');
        return;
      }
      setCopied(name);
      window.setTimeout(() => setCopied((prev) => (prev === name ? '' : prev)), 1400);
    } catch {
      setError('Unable to copy icon name.');
    }
  }, []);

  return (
    <AppShell>
      <PageSection
        title="Icons"
        subtitle={`${ICON_NAMES.length} icon type names. Click any tile to copy the icon type.`}
      >
        <div style={{ display: 'grid', gap: 24 }}>
          {categories.map((group) => (
            <section key={group.title} style={{ display: 'grid', gap: 12 }}>
              <h3 style={{ margin: 0 }}>{group.title}</h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: 10,
                }}
              >
                {group.names.map((name) => {
                  const isCopied = copied === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => onCopy(name)}
                      title={`Copy type name: ${name}`}
                      style={{
                        border: '1px solid var(--nx-color-border-subtle)',
                        borderRadius: 10,
                        padding: '12px 8px',
                        background: isCopied ? 'var(--nx-color-primary-soft)' : 'var(--nx-color-surface-raised)',
                        color: 'var(--nx-color-text-strong)',
                        cursor: 'pointer',
                        display: 'grid',
                        justifyItems: 'center',
                        alignContent: 'start',
                        minHeight: 94,
                        gap: 8,
                      }}
                    >
                      <Icon icon={name} color={isCopied ? 'success' : 'primary'} />
                      <span style={{ fontSize: 12, textAlign: 'center', wordBreak: 'break-word' }}>{name}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          <div aria-live="polite" style={{ minHeight: 20, fontSize: 13 }}>
            {copied ? `Copied: ${copied}` : error}
          </div>
        </div>
      </PageSection>
    </AppShell>
  );
}

const meta: Meta<typeof Icon> = {
  title: 'Icons/Default',
  component: Icon,
  args: {
    icon: 'home',
    color: 'inherit',
    size: 28,
  },
  argTypes: {
    icon: { control: 'select', options: ICON_NAMES },
    color: { control: 'select', options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'] },
    size: { control: { type: 'number', min: 12, max: 96, step: 1 } },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  render: (args) => (
    <AppShell>
      <PageSection title="Icon playground" subtitle="Choose an icon, color, and size from the available registry.">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <Icon {...args} />
          <span style={{ fontSize: 14 }}>{String(args.icon)}</span>
        </div>
      </PageSection>
    </AppShell>
  ),
};

export const AllIcons: Story = {
  render: () => <IconGallery />,
};
