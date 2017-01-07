import {
  select,
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

const svg = select('body')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

const polylines = svg.selectAll('polyline')
  .data(Arabesque(svg, {
    cx:       360,
    cy:       360,
    distance: 20,
    radius:   80,
    slope1:   144,
    slope2:   144,
    sprokets: 24,
    branch:   3
  }))
  .enter()
    .append('polyline')
    .attr('points', d => d)
    .attr('fill', 'none')
    .attr('stroke', (d, i) => colors[i % (colors.length)])
    .attr('stroke-width', 3)
    .on('mouseover', d => {
      console.log(d)
    })
