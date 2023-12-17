import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';
import { stream } from 'play-dl';

const player = createAudioPlayer();

export default async (interaction, connection)=>{
  const url = interaction.options.getString('url');

  try {
    const audioStream = (await stream(url, {discordPlayerCompatibility: true})).stream;
    player.play(createAudioResource(audioStream, {
      inputType: stream.type,
    }));
    const channel = interaction.member.voice.channel
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    connection.subscribe(player);
    await interaction.reply(`Начинаю воспроизведение: ${url}`);
  } catch(err) {
    console.log(err)
  }
}