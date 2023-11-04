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
