import Avatars from '@dicebear/avatars'
import sprites from '@dicebear/avatars-male-sprites'

function genetarAvatarBySeed(seed) {
  if (!seed || seed == '') {
    seed = Math.floor(Math.random() * 100 + 1)
  }
  let options = {}
  let avatars = new Avatars(sprites, options)
  let svg = avatars.create(seed)
  return svg
}

export { genetarAvatarBySeed }
