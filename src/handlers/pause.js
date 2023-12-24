import { AudioPlayer } from '@discordjs/voice'

/**
* @param
* @param {{player: AudioPlayer}} context - context of app
*/
export default async (_, context) => {
  try {
    const { player } = context
    player.pause()
  } catch (err) {
    console.error(err)
  }
}