import React from 'react';
import { Dropdown } from 'react-daisyui';

export type ThemeId =
  | 'onedark'
  | 'onelight'
  | 'monokai'
  | 'solarized_dark'
  | 'solarized_light'
  | 'tokyo_night_dark'
  | 'tokyo_night_light'
  | 'nord'
  | 'sakura';
export type Theme = { type: ThemeId; display: string };
export const themes: Theme[] = [
  { type: 'onedark', display: 'OneDark' },
  { type: 'onelight', display: 'OneLight' },
  { type: 'monokai', display: 'Monokai' },
  { type: 'solarized_dark', display: 'Solarized Dark' },
  { type: 'solarized_light', display: 'Solarized Light' },
  { type: 'tokyo_night_dark', display: 'Tokyo Night Dark' },
  { type: 'tokyo_night_light', display: 'Tokyo Night Light' },
  { type: 'nord', display: 'Nord' },
  { type: 'sakura', display: 'Sakura' },
];

export function ThemeSelector() {
  return (
    <Dropdown className="bg-transparent" vertical="bottom" end>
      <Dropdown.Toggle className="group btn bg-transparent border-transparent" button={false}>
        <span className="i-carbon-settings w-5 h-5 group-hover:animate-spin">設定</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-72">
        {themes.map((theme) => {
          return (
            <Dropdown.Item key={theme.type} data-set-theme={theme.type}>
              <span data-theme={theme.type} className="p-1 rounded-sm flex flex-row gap-2">
                <span className="grid grid-cols-8 grid-rows-2 gap-0">
                  <span className="w-2 h-2 inline-block bg-b16-tm-0" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-1" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-2" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-3" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-4" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-5" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-6" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-7" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-8" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-9" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-10" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-11" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-12" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-13" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-14" />
                  <span className="w-2 h-2 inline-block bg-b16-tm-15" />
                </span>
                <span>{theme.display}</span>
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
