/**
 * 数字の配列を足す
 * @param  {Array} a [description]
 * @param  {Array} b [description]
 * @return {Array}   [description]
 */
const arrayAdd = (a, b) => {
  const result = []
  for (var i = 0; i < Math.min(a.length, b.length); i++) {
    result.push(Math.round(a[i] + b[i]))
  }
  return result
}

const sin = deg => Math.sin(Math.PI * deg / 180)
const cos = deg => Math.cos(Math.PI * deg / 180)

/**
 * 極座標系を直交座標系に変換
 * @param  {Number} r [description]
 * @param  {Number} t [description]
 * @return {Array}   [description]
 */
const polar2angular = ([r, t]) => [r * sin(t), r * cos(t)]

/**
 * 時計の文字盤配置のような均等間隔の割付配列を作成
 * @param  {[type]} sprokets [description]
 * @return {[type]}          [description]
 */
const createSproketTable = sprokets => Array.from(Array(sprokets).keys()).map(i => 90 + i * 360 / sprokets)

/**
 * 直交座標のある点から、極座標指定で移動した点を取得
 * @param  {[type]} point    [description]
 * @param  {[type]} distance [description]
 * @param  {[type]} angle    [description]
 * @return {[type]}          [description]
 */
const extend = (point, distance, angle) => arrayAdd(point, polar2angular([distance, angle]))

/**
 * アラベスク模様を描写するためのポリラインを作成
 * @param {[type]} svg      [description]
 * @param {[type]} cx       [description]
 * @param {[type]} cy       [description]
 * @param {[type]} distance [description]
 * @param {[type]} radius   [description]
 * @param {[type]} slope1   [description]
 * @param {[type]} slope2   [description]
 * @param {[type]} sprokets [description]
 * @param {[type]} branch   [description]
 */
export default (svg, {
  cx,
  cy,
  distance,
  radius,
  slope1,
  slope2,
  sprokets,
  branch
}) => createSproketTable(sprokets)
  .map(angle => {

    // 初期値
    const result = [extend([cx, cy], distance, angle)]
    let foward   = angle - slope1 / 2
    let backward = angle + slope1 / 2

    for (let j = 0; j < branch; j++) {
      const unit = 2 * (j % 2) - 1
      result.push(extend(result[j * 2], radius, foward))
      result.unshift(extend(result[0], radius, backward))
      foward += unit * (180 - (unit === -1 ? slope1 : slope2))
      backward -= unit * (180 - (unit === -1 ? slope1 : slope2))
    }

    return result.map(([x, y]) => `${x},${y}`).join(' ')
  })
