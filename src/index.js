import 'dotenv/config'
const { env: { D_TOKEN, D_CLIENT_ID } } = process

import { Client, GatewayIntentBits, REST } from 'discord.js';
import { Routes } from 'discord-api-types/v10';
import { SlashCommandBuilder } from '@discordjs/builders';
import handlers from './handlers/index.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const commands = [
  new SlashCommandBuilder()
    .setName('play')
    .setDescription('Проиграть музыку из YouTube')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('Ссылка на YouTube видео')
        .setRequired(true),
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Остановить музыку и покинуть канал')
    .toJSON(),
];

const rest = new REST({ version: '10' }).setToken(D_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(D_CLIENT_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  try {
    await handlers[interaction.commandName](interaction)
  } catch(err) {
    console.log(err)
  }
});
client.login(D_TOKEN);
