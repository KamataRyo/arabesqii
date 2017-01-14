import {
  select,
  selectAll
} from 'd3-selection'
import 'd3-transition'
import Arabesque from './Arabesque'

const [WIDTH, HEIGHT] = [720, 720]

/**
 * 色テーブル
 * @type {Array}
 */
const colors = [
  'darkcyan',
  'teal',
  'darkslategray',
  'darkgreen',
  'green',
  'forestgreen',
  'seagreen',
  'mediumseagreen'
]

const svg = select('.arabesque')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

const arabesque = Arabesque(svg, {
  cx:       360,
  cy:       360,
  distance: 60,
  radius:   180,
  slope1:   144,
  slope2:   144,
  sprokets: 8,
  branch:   3
})

const groups = svg.selectAll('polyline')
  .data(arabesque)
  .enter().append('g')

groups
  .append('polyline')
  .attr('points', d => d)
  .attr('fill', 'none')
  .attr('stroke', 'white')
  .attr('stroke-width', 32)

groups
  .append('polyline')
    .attr('points', d => d)
    .attr('fill', 'none')
    .attr('stroke', (d, i) => colors[i % (colors.length)])
    .attr('stroke-width', 16)
//
// const paramListener = param => ({ target: { value } }) => {
//   arabesque[param] = value
//   selectAll('polyline')
//     .transition()
//     .delay(1000)
//     .duration(1000)
//     .attr('opacity', .2)
//     // .attr('fill', 'none')
//     // .attr('stroke', (d, i) => colors[i % (colors.length)])
//     // .attr('stroke-width', 16)
// }
//
// ;[
//   'distance',
//   'radius',
//   'branch'
// ].map(param => document
//   .getElementById(param)
//   .addEventListener('change', paramListener(param))
// )
