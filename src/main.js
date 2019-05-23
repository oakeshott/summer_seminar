// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DataViz from '@/components/DataViz'
import Map from '@/components/Map'
// import Form from '@/components/Form'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as d3 from 'd3'
import store from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
new Vue({
  el: '#map',
  store,
  router,
  components: { Map },
  template: '<Map/>'
})
new Vue({
  el: '#data-viz',
  store,
  router,
  data: {
  },
  components: { DataViz },
  template: '<DataViz/>',
  mounted: () => {
    var margin = {top: 10, right: 30, bottom: 30, left: 40}
    var width = 500 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom
    var div = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
    var svg = d3.select('#data-viz')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    var link = svg.selectAll('line')
      .data(store.state.links)
      .enter()
      .append('line')
      .attr('id', (d, i) => { return 'link' + d.id })
      .attr('stroke', '#aaa')
      .attr('stroke-width', 10)
      .attr('class', 'link')
      .attr('flow', 0)
      .attr('selecting-mode', 'false')
      .attr('selected', 'false')
      .attr('x1', (d) => { return d.source.x })
      .attr('y1', (d) => { return d.source.y })
      .attr('x2', (d) => { return d.target.x })
      .attr('y2', (d) => { return d.target.y })
      .on('mouseover', (d, i) => {
        svg.select('#link' + d.id).attr('stroke', '#1e90ff')
        div.transition()
          .duration(500)
          .style('opacity', 1.0)
        div.html('<span>link-id: ' + d.id + '</span><br/>' + '<span>flow: ' + d.flow + '</span>')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
      })
      .on('mouseleave', (d, i) => {
        var l = svg.select('#link' + d.id)
        if (l.attr('selected') === 'false') {
          l.attr('stroke', '#aaa')
        }
        div.transition()
          .duration(500)
          .style('opacity', 0.0)
      })
      .on('click', (d, i) => {
        var l = svg.select('#link' + d.id)
        if (l.attr('selecting-mode') === 'true') {
          if (l.attr('selected') === 'false') {
            l.attr('selected', true)
            l.attr('stroke', '#1e90ff')
          } else {
            l.attr('selected', false)
            l.attr('stroke', '#aaa')
          }
        }
      })
    var node = svg.selectAll('circle')
      .data(store.state.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('id', (d, i) => { return 'node' + i })
      .attr('class', 'node')
      .attr('fill', '#69b3a2')
      .attr('cx', (d) => { return d.x })
      .attr('cy', (d) => { return d.y })
      .on('mouseover', (d, i) => {
        svg.select('#node' + i).attr('fill', '#bbb')
        div.transition()
          .duration(500)
          .style('opacity', 1.0)
        div.html('<span>node-id: ' + d.id + '</span><br/>' + '<span>name: ' + d.name + '</span>')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
      })
      .on('mouseleave', (d, i) => {
        svg.select('#node' + i).attr('fill', '#69b3a2')
        div.transition()
          .duration(500)
          .style('opacity', 0.0)
      })
    var ticked = () => {
      link
        .attr('x1', (d) => { return d.source.x })
        .attr('y1', (d) => { return d.source.y })
        .attr('x2', (d) => { return d.target.x })
        .attr('y2', (d) => { return d.target.y })

      node
        .attr('cx', (d) => { return d.x })
        .attr('cy', (d) => { return d.y })
    }
    d3.forceSimulation(store.state.nodes)
      .force('link', d3.forceLink()
        .id((d) => { return d.id })
        .links(store.state.links)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('end', ticked)

    var svg2 = d3.select('#data-viz')
      .append('svg')
      .attr('id', 'data-viz-res')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    var link2 = svg2.selectAll('line')
      .data(store.state.links)
      .enter()
      .append('line')
      .attr('id', (d, i) => { return 'link0' + d.id })
      .attr('stroke', '#ccc')
      .attr('stroke-width', 10)
      .attr('class', 'link-res')
      .attr('flow', (d) => { return d.flow })
      .attr('selecting-mode', 'false')
      .attr('selected', 'false')
      .attr('x1', (d) => { return d.source.x })
      .attr('y1', (d) => { return d.source.y })
      .attr('x2', (d) => { return d.target.x })
      .attr('y2', (d) => { return d.target.y })
      .on('mouseover', (d, i) => {
        div.transition()
          .duration(500)
          .style('opacity', 1.0)
        div.html('<span>link-id: ' + d.id + '</span><br/>' + '<span>flow: ' + d.flow + '</span>')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
      })
      .on('mouseleave', (d, i) => {
        div.transition()
          .duration(500)
          .style('opacity', 0.0)
      })
    var node2 = svg2.selectAll('circle')
      .data(store.state.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('id', (d, i) => { return 'node0' + i })
      .attr('class', 'node-res')
      .attr('fill', '#69b3a2')
      .attr('cx', (d) => { return d.x })
      .attr('cy', (d) => { return d.y })
      .on('mouseover', (d, i) => {
        div.transition()
          .duration(500)
          .style('opacity', 1.0)
        div.html('<span>node-id: ' + d.id + '</span><br/>' + '<span>name: ' + d.name + '</span>')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
      })
      .on('mouseleave', (d, i) => {
        div.transition()
          .duration(500)
          .style('opacity', 0.0)
      })
    var ticked2 = () => {
      link2
        .attr('x1', (d) => { return d.source.x })
        .attr('y1', (d) => { return d.source.y })
        .attr('x2', (d) => { return d.target.x })
        .attr('y2', (d) => { return d.target.y })

      node2
        .attr('cx', (d) => { return d.x })
        .attr('cy', (d) => { return d.y })
    }
    d3.forceSimulation(store.state.nodes)
      .force('link', d3.forceLink()
        .id((d) => { return d.id })
        .links(store.state.links)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('end', ticked2)
  }
})
