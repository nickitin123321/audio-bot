import { joinVoiceChannel, createAudioResource, VoiceConnection, AudioPlayer } from '@discordjs/voice';
import { Interaction } from 'discord.js';
import { stream } from 'play-dl';

/**
 * @param {Interaction} interaction - interaction
 * @param {string} url - yt video url
 * @param {VoiceConnection} connection - voice connection
 * @param { AudioPlayer} player - player
 */
const play = async (interaction, connection, player, url) => {
  const audioStream = (await stream(url, { discordPlayerCompatibility: true })).stream;
  player.play(createAudioResource(audioStream, {
    inputType: stream.type,
  }));

  connection.subscribe(player);
  await interaction.reply(`Начинаю воспроизведение: ${url}`);
}

/**
 * @param {Interaction} interaction - interaction
 * @returns {VoiceConnection}
 */
const joinConnection = (interaction) => {
  const channel = interaction.member.voice.channel
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  })

  return connection
}

/**
 * @param {Interaction} interaction - interaction
 * @param {{connection: VoiceConnection, player: AudioPlayer}} context
 */
export default async (interaction, context) => {
  if(player.state.status === 'pause'){
    player.unpause()
    return
  }

  const url = interaction.options.getString('url');

  const player = context.player
  let connection = context.connection
  if ( player.subscribers.length === 0) {
    context.connection = joinConnection(interaction)
  }

  try {
    play(interaction, connection, player, url)
  } catch (err) {
    console.error(err)
  }
}