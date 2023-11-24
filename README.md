# Obsidian Pivotal Tracker Story Plugin

This is a plugin for Obsidian (https://obsidian.md) that updates Pivotal Tracker (PT) stories with the story
title and estimate.

## Features

- Updates a Pivotal Tracker URL to the story title and estimate.
	- **Note**: The URL must be in the format `https://www.pivotaltracker.com/story/show/<story_id>`.
	- Adds a command to the command palette to update the selected URL: Update PT Link.
	- Automatically update PT links whe pasting a URL into a note.

## Ideas for the future

- Add a command to the command palette to update all PT links in the current note.
- Add a command to the command palette to update all PT links in the current vault.
- Update commands to update PT links that were already replaced in the current note or vault with updated info.
- Support other story URL formats, e.g. `https://www.pivotaltracker.com/n/projects/<project_id>/stories/<story_id>`.
- Support other story formats, e.g. `#<story_id>`.
- Support configuring the story link title format.
- Fetch story project name and display it in the link title.
- Make PT link detection more robust.
- Add tests.
- Publish to Obsidian Community Plugins.

## Installation

- Enable Community Plugins in Obsidian.
- Clone this repo to your vault's plugin folder `VaultFolder/.obsidian/plugins/`.
- Enable the plugin in Obsidian's Community Plugins settings page.

## Configuration

- Open the plugin settings page and enter your PT API token.
	- You can find your API token in your PT profile settings page: https://www.pivotaltracker.com/profile
	- **Note**: The API token is stored in your Obsidian vault settings file. It is not shared with anyone.
    - **Note**: The API token is only used to fetch story info. It is not used for any other purpose.

## How to use

- Paste a PT story URL into a note. OR
- Select the URL and run the command `Update PT Link` from the command palette.

## How run locally for development

- Clone this repo to your vault's plugin folder `VaultFolder/.obsidian/plugins/`.
- Make sure your NodeJS is at least v16 (`node --version`).
- `npm i` or `yarn` to install dependencies.
- `npm run dev` to start compilation in watch mode.

## How to create a new release

- Update the version number in the `manifest.json`.
- Run `git tag -a 1.0.0 -m "1.0.0"` with the same version number of the `manifest.json`.
- Run `git push origin 1.0.0` with the same version number of the `manifest.json`.

## API Documentation

See https://github.com/obsidianmd/obsidian-api
