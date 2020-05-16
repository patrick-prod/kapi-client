import Avatars from '@dicebear/avatars'
import MalSprites from '@dicebear/avatars-male-sprites'
import GridySprites from '@dicebear/avatars-gridy-sprites'
import IdenticonSprites from '@dicebear/avatars-identicon-sprites'

function genetarAvatarBySeed(seed) {
  if (!seed || seed == '') {
    seed = Math.floor(Math.random() * 100 + 1)
  }
  let options = {}
  let avatars = new Avatars(MalSprites, options)
  let svg = avatars.create(seed)
  return svg
}

function genetarGroupIconBySeed(seed) {
  if (!seed || seed == '') {
    seed = Math.floor(Math.random() * 100 + 1)
  }
  let options = {}
  let avatars = new Avatars(GridySprites, options)
  let svg = avatars.create(seed)
  return svg
}

function genetarProjectIconBySeed(seed) {
  if (!seed || seed == '') {
    seed = Math.floor(Math.random() * 100 + 1)
  }
  let options = {}
  let avatars = new Avatars(IdenticonSprites, options)
  let svg = avatars.create(seed)
  return svg
}

export { genetarAvatarBySeed, genetarGroupIconBySeed, genetarProjectIconBySeed }
