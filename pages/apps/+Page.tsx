import { Divider } from 'react-daisyui';
import { Article } from '../../components/Article';
import { Card } from '../../components/Card';
import { AppType, main_apps, minor_apps } from '../../src/apps';

function App({ app }: { app: AppType }) {
  return (
    <Card
      head={<div>{app.name}</div>}
      link={app.url}
      outside={app.outside}
      className="flex-grow-0 flex-shrink-0 block w-64 h-64 overflow-hidden"
    >
      <p className="">{app.copy}</p>
      {app.img ? (
        <img src={app.img} className="hero object-fit mt-2" />
      ) : undefined}
    </Card>
  );
}

export default function Page() {
  const all_apps = [...main_apps, ...minor_apps];
  return (
    <div>
      <Article>
        <h1>ウェブアプリ</h1>
      </Article>
      <div className="flex gap-3 flex-wrap my-3">
        {all_apps.map((app) => (
          <App app={app} />
        ))}
      </div>
    </div>
  );
}