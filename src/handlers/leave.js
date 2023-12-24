import { getVoiceConnection } from '@discordjs/voice';

export default async (interaction)=>{
  try {
    const connection = getVoiceConnection(interaction.guild.id)
    await connection.destroy()
    await interaction.reply(`Ухожу`);
  } catch(err) {
    console.error(err)
  }
}