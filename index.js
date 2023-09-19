// Require the necessary discord.js classes

const axios = require('axios');

async function fetchStory()
{
	try
	{
		//Accessing recent news stories
		const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
		const storyIDs = response.data;

		//Fetching stories via IDs
		for (const storyID of storyIDs)
		{
			const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`);
			const storyData = storyResponse.data;

			//Fetching the title, uri, and text for each new story
			const storyTitle = storyData.title;
			const storyLink = storyData.url;
			const storyText = storyData.text;
			const dataType = storyData.type;

			const postChannel = client.channels.cache.get('1129288152549437472')
			postChannel.send(`**Title:**\n${storyTitle}\n\n**Text:**\n${storyText}\n\n**Link:**${storyLink}\n\n**Type:**\n${dataType}`);
		}

	}

	catch (error)
	{
		console.error('Error finding stories:', error);
	}
}


const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => 
{
	console.log('Logged in as ${client.user.tag}');

	setInterval(fetchStory, 60000); //Run function every 60 secs
});

client.login(token);