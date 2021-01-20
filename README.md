# Doko どこ
A developer focused plugin to help navigate between deployment environments.

Doko proposes a `meta` tag based standard for web applications to express useful information about the environment which assists developers and testers ensure they are assessing the right environment without having to make visual changes to the user interfaces.

We propose a [protocol](RFC.md) that web applications use expose the `meta` information to Doko which the plugin respects.

Doko translates to [Where](https://translate.google.com/?sl=auto&tl=en&text=doko&op=translate) in Japanese.

> Screenshot
![Doko Widget Screenshot](assets/doko-screenshot.png "Doko Widget Screenshot")

# The protocol

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

## Developer notes

The Doko plugin is built using [React](https://reactjs.org) and targets Safari, Chrome and FireFox. [Yarn](https://classic.yarnpkg.com/en/docs/getting-started) is our package manager of choice.

Build each target using the following commands:

- `yarn build` - Builds the app for Chrome production to the `build` folder.
- `yarn build:firefox`   - Builds the app for Firefox production to the `build` folder. (includes required `id` in manifest)

- `yarn zip` - Create an archive from the build directory named `Doko.zip`. The archive will be located in the dist directory

> Note: both builds build to the same directory, so do one at a time

## Getting help

We welcome feedback, ideas and code contributions. Feel free to fork the repository and open pull requests for us to consider merging back into the project.

Issues are tracked using [Github issues](https://github.com/anomaly/Doko/issues) on this repository. Feel free to open an issue. We ask you be thoughtful and provide as much information as possible using the issue template provided.

## License

Doko (the protocol and plugin) are distributed under the  [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). See `LICENSE` for further details.