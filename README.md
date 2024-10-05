# Tomorrow's Daily Note

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/frankolson/obsidian-tomorrows-daily-note?sort=semver&style=for-the-badge)

An [Obsidian](https://obsidian.md/) plugin that creates tomorrow's daily note for preemptive planning.

See the [changelog](/CHANGELOG.md) for the latest changes and updates.

## Requirements

- Obsidian **v0.12.0+**.
- [Daily notes plugin](https://help.obsidian.md/Plugins/Daily+notes) enabled

## Usage

You can open tomorrow's daily note using ribbon icon or the following command: `Tomorrow's Daily Note: Open tomorrow's daily note`

![Tomorrow's Daily Note Preview](/docs/images/plugin-preview.png)

### Settings

You can configure the following settings from the plugin settings menu:

- **Skip Weekends**: If enabled, the plugin will skip weekends when creating tomorrow's daily note.
- **Show icon in sidebar**: If enabled, the plugin will show an icon in the sidebar for easy access to tomorrow's daily note.

![Tomorrow's Daily Note Settings](/docs/images/settings-preview.png)

## Installing

Version [0.9.7 of Obsidian](https://forum.obsidian.md/t/obsidian-release-v0-9-7-insider-build/7628) lets you install this plugin from within the app.

You can find the most up-to-date guides for installation here: https://help.obsidian.md/Advanced+topics/Community+plugins

### Manual installation

1. Clone this repo to the `.obsidian/plugins/` directory of your vault
2. Force reload Obsidian: `View > Force Reload`
3. Enable the plugin in the [Community plugins](https://help.obsidian.md/Advanced+topics/Community+plugins) settings menu

## For developers
Pull requests are both welcome and appreciated.

If you would like to contribute to the development of this plugin, please follow the guidelines provided in [CONTRIBUTING.md](CONTRIBUTING.md).

### Deployment

1. Bump the version in `manifest.json` and the `package.json` files.
2. Create a new release on GitHub with the version number as the tag: `git tag -a <version number> -m "<version number>"`
3. Push the tag: `git push origin <version number>`
4. The release will be automatically built and deployed by GitHub Actions, and you can check the progress in the repository's [Actions tab](https://github.com/frankolson/obsidian-tomorrows-daily-note/actions).
5. Then go add release notes to the newly created draft release in the repository's [Releases tab](https://github.com/frankolson/obsidian-tomorrows-daily-note/releases).
6. Once you're happy with the release notes, click the "Publish release" button.

## Donating

I really enjoy building stuff. Sometimes for myself, sometimes for others. If have been helped by this plugin and wish to support it, please see the following link:

https://github.com/sponsors/frankolson

Donations will go towards my computing costs, licenses for development tools, and the time I spend developing and supporting this plugin.

Thank you!
