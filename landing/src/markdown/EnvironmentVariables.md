---
link: env-variables
title: Environment Variables
order: 6
---

Environment variables must be put side by side to `purplehaze.json` in `.env` file.It is available only inside `export default` and `export const head` . They can be used only inside the `export const data` function.

Of course all env variables from system are avalable too.

Usage example:

```
HOST=https://example.com
```

```js
export const data = async () => {
  const content = await fetch(ssg.envs.HOST);
  return { content: await content.json() };
};
```

It is available only inside `export const data` and `export const head` function to prevent leaking of secrets.
