# Minton - Nuxtjs Responsive Admin Dashboard Template

## setup-1

open nuxt.config.js file

# 1.1

update base url of the backed api for axios call

# 1.2

update pusher information under the buildModules array
[
'@nuxtjs/laravel-echo', {
broadcaster: 'pusher',
key: '1234564556a4568cab9c',
cluster: 'mt1',
forceTLS: true
}
]

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

make build by using above command place the dist folder file inside root directory
