import { Actor, CollisionType, Color, DisplayMode, Engine, vec } from 'excalibur'

const SIZE = 600
const COLORS = [Color.Green, Color.Red, Color.Blue, Color.Yellow]

// Create an instance of the engine.
const game = new Engine({
  width: SIZE,
  height: SIZE * 5 / 6,
})

const cells: Actor[][] = []
for (let y = 0; y < 5; y++) {
  cells[y] = []
  for (let x = 0; x < 6; x++) {
    // セルを一つ作る
    cells[y][x] = new Actor({
      x: (x + 0.5) * SIZE / 6,
      y: (y + 0.5) * SIZE / 6,
      width: SIZE / 6 * 0.9,
      height: SIZE / 6 * 0.9,
      color: COLORS[Math.floor(Math.random() * 4)]
    })
    game.add(cells[y][x])
  }
}

// Start the engine to begin the game.
game.start()