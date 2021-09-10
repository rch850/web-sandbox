import { Actor, Color, Engine } from 'excalibur'

const SIZE = 600
const COLORS = [Color.Green, Color.Red, Color.Blue, Color.Yellow]
/** ドラッグ中のセルのX座標 */
let dragX = 0
/** ドラッグ中のセルのY座標 */
let dragY = 0

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
    const cell = new Actor({
      x: (x + 0.5) * SIZE / 6,
      y: (y + 0.5) * SIZE / 6,
      width: SIZE / 6 * 0.9,
      height: SIZE / 6 * 0.9,
      color: COLORS[Math.floor(Math.random() * 4)]
    })

    // ドラッグ系イベントまとめ
    // ドラッグ開始: pointerdragstart
    // ドラッグ中に他に侵入: pointerdragenter
    // ドラッグ終了:pointerdragend

    cell.on('pointerdragstart', (ev) => {
      dragX = Math.floor(ev.target.pos.x / (SIZE / 6))
      dragY = Math.floor(ev.target.pos.y / (SIZE / 6))
      console.log('pointerdragstart', dragX, dragY)
    })

    cell.on('pointerdragenter', function (ev) {
      // 移動先のセルの座標
      const thatX = Math.floor(ev.target.pos.x / (SIZE / 6))
      const thatY = Math.floor(ev.target.pos.y / (SIZE / 6))
      console.log('pointerdragenter', dragX, dragY, thatX, thatY)

      // 入れ替え処理
      const drag = cells[dragY][dragX]
      const that = cells[thatY][thatX]
      cells[dragY][dragX] = that
      cells[thatY][thatX] = drag
      drag.pos.setTo((thatX + 0.5) * SIZE / 6, (thatY + 0.5) * SIZE / 6)
      that.pos.setTo((dragX + 0.5) * SIZE / 6, (dragY + 0.5) * SIZE / 6)

      // ドラッグ中のセルを更新
      dragX = thatX
      dragY = thatY
    })

    cell.on('pointerdragend', (ev) => {
      console.log('pointerdragend', ev)
      // Xperia 1 II (Android 11) だと Left と Unknown で2回イベントが来たので、
      // Left だけを採用します。
      if (ev.button === "Left") {
        eraseCells(cells)
      }
    })

    cells[y][x] = cell
    game.add(cells[y][x])
  }
}

// Start the engine to begin the game.
game.start()

function eraseCells(cells: Actor[][]) {
  const MIN_ERASE = 3
  const eraseFlags: boolean[][] = []
  for (let y = 0; y < cells.length; y++) {
    eraseFlags[y] = []
    for(let x = 0; x < cells[0].length; x++) {
      eraseFlags[y][x] = false
    }
  }

  // 横方向の並びをチェック
  for (let y = 0; y < cells.length; y++) {
    let cont = 1
    let prevColor = cells[y][0].color.toHex()
    for (let x = 1; x < cells[0].length; x++) {
      if (cells[y][x].color.toHex() === prevColor) {
        cont++
        if (cont >= MIN_ERASE) {
          for (let i = 0; i < cont; i++) {
            eraseFlags[y][x-i] = true
          }
        }
      } else {
        cont = 1
        prevColor = cells[y][x].color.toHex()
      }
    }
  }
  // 縦方向の並びをチェック
  for (let x = 0; x < cells[0].length; x++) {
    let cont = 1
    let prevColor = cells[0][x].color.toHex()
    for (let y = 1; y < cells.length; y++) {
      if (cells[y][x].color.toHex() === prevColor) {
        cont++
        if (cont >= MIN_ERASE) {
          for (let i = 0; i < cont; i++) {
            eraseFlags[y-i][x] = true
          }
        }
      } else {
        cont = 1
        prevColor = cells[y][x].color.toHex()
      }
    }
  }

  cells.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (eraseFlags[y][x]) {
        cells[y][x].kill()
        cells[y][x] = undefined
      }
    })
  })
}
