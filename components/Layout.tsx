import React, { useEffect } from 'react';
import { Divider } from 'react-daisyui';
import { themeChange } from 'theme-change';

import { Sidebar, ThemeSelector } from '#root/components/features';

import '#root/layouts/scrollbar.css';
import '#root/layouts/selection.css';
import '#root/layouts/tailwind.css';
import '#root/layouts/themes.css';

export function Layout(props: { wide: boolean; children: React.ReactNode }) {
  return (
    <div className="transition-colors min-h-screen font-sans text-base-content-tm bg-base-tm-100">
      <Header />
      <div className="flex flex-nowrap flex-col lg:flex-row-reverse lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:right-0">
        <main className="flex-grow lg:overflow-auto pt-header">
          <div className="p-content-space">
            <Content wide={props.wide}>{props.children}</Content>
          </div>
        </main>
        <nav id="sidebar" className="flex-grow-0 flex-shrink-0 lg:overflow-auto lg:mt-header">
          <Divider vertical className="lg:hidden" />
          <Sidebar />
        </nav>
      </div>
    </div>
  );
}

function Content(props: { wide: boolean; children: React.ReactNode }) {
  return <div className={(!props.wide ? 'max-w-5xl' : '') + ' ' + 'mx-auto'}>{props.children}</div>;
}

function Header() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <header className="z-50 bg-header-color backdrop-blur-sm border-b border-solid border-header-border-color h-header fixed top-0 w-full flex flex-row">
      <div className="flex items-center h-full">
        <div className="px-5 flex items-center">
          <a href="/">
            <span className="i-icon-park-twotone-crab block px-5 w-6 h-6 bg-orange-500"></span>
          </a>
          <a href="/">
            <span className="block">yuma14.net</span>
            <span className="hidden" data-set-theme="" data-key="homepage-theme" />
          </a>
        </div>
      </div>
      <div className="flex-grow"></div>
      <ThemeSelector />
    </header>
  );
}
