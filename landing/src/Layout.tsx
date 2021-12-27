import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

export const Layout: React.FC<{
  routes: Array<Route>;
  activeRoute?: string;
  prefix?: string;
}> = ({ children, routes, activeRoute, prefix = '' }) => {
  return (
    <div className="flex mx-auto h-full">
      <div className="py-10 px-20 bg-gray-100 h-full w-80">
        <a className="block py-4 text-lg text-purple-900 font-black" href="/">
          Purple haze
        </a>
        {routes.map((r) => (
          <a
            className={`block py-4 text-md${
              activeRoute === r.link ? ' text-purple-900' : ''
            }`}
            href={`${prefix}/page/${r.link}.html`}
          >
            {r.title}
          </a>
        ))}
      </div>
      <div className="container mx-auto p-10 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

type Route = {
  link: string;
  title: string;
};
