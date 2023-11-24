import { App, Editor, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { getStoryTitle } from "./pivotal";
import { PT_REGEX, PT_URL_LENGTH } from "./constants";

interface PTLinkSettings {
	ptToken: string;
}

interface StoryJson {
	name: string;
	estimate: number;
	url: string;
}

const DEFAULT_SETTINGS: PTLinkSettings = {
	ptToken: ''
}

export default class PTLink extends Plugin {
	settings: PTLinkSettings;

	async onload() {
		await this.loadSettings();

		const getLinkTitle = (storyJson: StoryJson): string => {
			return `[${storyJson?.name} (${storyJson?.estimate || '??'})](${storyJson?.url})`
		}

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'update-pt-link',
			name: 'Update PT Link',
			editorCallback: (editor: Editor): void => {
				const url = editor.getSelection();

				getStoryTitle(this.settings.ptToken, url).then((storyJson) => {
					editor.replaceSelection(getLinkTitle(storyJson));
				});
			}
		});

		this.registerEvent(
			this.app.workspace.on(
				'editor-paste',
				(
					event: ClipboardEvent,
					editor: Editor
				) => {
					const url = event.clipboardData?.getData('text/plain') || '';

					if (!PT_REGEX.test(url)) {
						return;
					}

					getStoryTitle(this.settings.ptToken, url).then((storyJson) => {
						const endCursor = editor.getCursor();
						const startCursor = {...endCursor, ch: endCursor.ch - PT_URL_LENGTH}
						editor.replaceRange(
							getLinkTitle(storyJson),
							startCursor,
							endCursor
						);
					});
				},
			),
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		return await this.saveData(this.settings);
	}
}

class SettingTab extends PluginSettingTab {
	plugin: PTLink;

	constructor(app: App, plugin: PTLink) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Pivotal Tracker Token')
			.addText(text => text
				.setPlaceholder('Enter your token')
				.setValue(this.plugin.settings.ptToken)
				.onChange(async (value) => {
					this.plugin.settings.ptToken = value;
					await this.plugin.saveSettings();
				}));
	}
}
