## Init Apps

```
$ mkdir next-mf-example
$ cd next-mf-example
$ touch README.md
```

```
$ npx create-next-app@13 host
# TS / src / Pages Router
$ npx create-next-app@13 mf
# TS / src / Pages Router
```

```
$ git init
$ rm -rf host/.git mf/.git
$ git add .
$ git commit -m "Add new next apps"
```

## Install nextjs-mf

```
$ cd host
$ npm i @module-federation/nextjs-mf@next
$ cd ../mf
$ npm i @module-federation/nextjs-mf@next
$ cd ..
$ git add .
$ git commit -m "Add nextjs-mf"
```

## Setting up

**Note**: latest is `8.0.1-4`, but we need `8.1.0-canary.1` to fix `Uncaught TypeError: Cannot read properties of null (reading 'useLayoutEffect')` error.

MF:

- Update deps: `cd mf && npm i @module-federation/nextjs-mf@8.1.0-canary.1`
- Add `mf/src/components/MyComp`
- Update `mf/next.config.js`
- Update `mf/package.json` — add `NODE_ENV=production NEXT_PRIVATE_LOCAL_WEBPACK=true` for `build` and `start` (with forced port 8002).

Host:

- Update deps: `cd host && npm i @module-federation/nextjs-mf@8.1.0-canary.1`
- Add `host/src/remote-delegate.js`
- Update `host/next.config.js`
- Update `host/package.json` — add `NODE_ENV=production NEXT_PRIVATE_LOCAL_WEBPACK=true` for `build` and `start` (with forced port 8001).
- Add `host/src/components/MyCompInt` for comparison
- Add `host/src/pages/test.tsx`
- Update `host/src/pages/_document.tsx`

## Running

MF:

```
$ cd mf
$ npm ci # for new cloned repo only
$ npm run build
$ npm run start
```

Host:

```
$ cd host
$ npm ci # for new cloned repo only
$ npm run build
$ npm run start
```

## Testing

- Open http://localhost:8001/test
- Check server console: chunks array is empty

## Workaround

Uncomment `globalThis: true,` in `host/remote-delegate.js`, rebuild and run `host`.

Open http://localhost:8001/test the first time:

```
Chunks:
[]
```

Open http://localhost:8001/test the second and all the following times:

```
Chunks:
[
  'http://localhost:8002/_next/static/css/7d223f446b5ca20e.css',
  'http://localhost:8002/_next/static/chunks/333.d04801fb422b6161.js'
]
```
