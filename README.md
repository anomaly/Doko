# Doko どこ
A developer focused plugin to help navigate between deployment environments.

Doko proposes a `meta` tag based standard for web applications to express useful information about the environment which assists developers and testers ensure they are assessing the right environment without having to make visual changes to the user interfaces.

We propose a [protocol](RFC.md) that web applications use expose the `meta` information to Doko which the plugin respects.

Doko translates to [Where](https://translate.google.com/?sl=auto&tl=en&text=doko&op=translate) in Japanese.

# The Protocol

The Doko protocol is inspired by standards like [The Open Graph protocol](https://ogp.me/) to describe the meta data, required by the plugin. This is broadly classified into the following sections:

- **Environment** - containing directives for the environment being accessed
- **Abstract** - defines information displayed as an abstract
- **Facts** - facts are an unlimited set of facts about the deployment (Doko promotes a sensible limit of five objects in the interest of better user experience).
- **Feedback** - provides a mechanism to provide quick link backs to ticket systems like (but not limited to) Github issues.

```html
<meta name="doko:environment" content="production"/>
<meta name="doko:title" content="Anomaly Software"/>
<meta name="doko:subtitle" content="https://anomaly.netlifyapp.com"/>
<meta name="doko:fact" content="Server|Netlify"/>
<meta name="doko:fact" content="Database|PostgreSQL 2.0"/>
<meta name="doko:fact" content="Node|ap-01a"/>
<meta name="doko:postissue" content="https://github.com/anomaly/anomaly/issues/new"/>
```

## Available Scripts

In the project directory, you can run:

## yarn build

Builds the app for Chrome production to the `build` folder.

## yarn build:firefox

Builds the app for Firefox production to the `build` folder. (includes required `id` in manifest)

> Note: both builds build to the same directory, so do one at a time
