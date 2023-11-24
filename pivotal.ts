import { requestUrl } from 'obsidian';
import { PT_REGEX } from "./constants";

const extractStoryId = (link: string) => {
	const match = PT_REGEX.exec(link);
	if (match) {
		return match[1];
	}
	return null;
}

interface Story {
	json: any
}

export async function getStoryTitle(token: string, link: string) {
	const storyId = extractStoryId(link);
	const url = `https://www.pivotaltracker.com/services/v5/stories/${storyId}`;

	return await requestUrl({ url: url,
		headers: {
			'X-TrackerToken': token,
			'Content-type': 'application/json'
		}
	}).then((story: Story) => {
		return story?.json;
	});
}

