<template>
  <div id="form">
    <v-container grid-list-md text-xs-center>
      <v-layout align-center>
        <v-flex xs12 md4>
          <div>
            <v-btn large v-on:click="changeSelectingMode">Selecting mode: {{ isActive }}</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 md4>
          <div>
            <v-btn large v-bind:disabled="!isActive" v-on:click="resetSelectingMode">Clear</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 md4>
          <div>
            <v-btn large v-bind:disabled="!isActive" v-on:click="submitRoute">Submit</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Form',
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    changeSelectingMode (e) {
      var svg = d3.select('#data-viz')
      svg.selectAll('line').attr('selecting-mode', true)
      this.isActive = !this.isActive
      // svg.selectAll('.line').attr('class', 'selecting-mode')
    },
    resetSelectingMode () {
      var svg = d3.select('#data-viz')
      svg.selectAll('line.link').attr('selecting-mode', false)
      svg.selectAll('line.link').attr('selected', false)
      svg.selectAll('line.link').attr('stroke', '#aaa')
      this.isActive = !this.isActive
    },
    submitRoute () {
      var svg = d3.select('#data-viz')
      var link = svg.selectAll('line[selected = "true"]')
      var route = []
      link.each((d, i) => {
        this.$store.commit('increment', d.id)
        svg.select('#link' + d.id)
          .attr('flow', this.$store.getters.getLinkById(d.id).flow)
        route.push(d.id)
        console.log(this.$store.getters.getNodeById(d.source))
      })
      var item = {
        id: this.$store.state.items.length,
        route: route
      }
      this.$store.commit('pushItem', item)
      svg.selectAll('line').attr('selecting-mode', false)
      svg.selectAll('line').attr('selected', false)
      svg.selectAll('line').attr('stroke', '#aaa')
      this.isActive = !this.isActive

      var margin = {top: 10, right: 30, bottom: 30, left: 40}
      var width = 500 - margin.left - margin.right
      var height = 500 - margin.top - margin.bottom
      var div = d3.select('div.tooltip')
      d3.select('#data-viz-res').remove()
      var svg2 = d3.select('#data-viz')
        .append('svg')
        .attr('id', 'data-viz-res')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      var link2 = svg2.selectAll('line')
        .data(this.$store.state.links)
        .enter()
        .append('line')
        .attr('id', (d, i) => { return 'link0' + d.id })
        .attr('stroke', '#ff6347')
        .attr('class', 'link-res')
        .attr('flow', (d) => { return d.flow })
        .attr('stroke-width', (d) => { return parseInt(d.flow) })
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
          div.html('<span>link-id: ' + d.id + '</span><br/>' + '<span>flow: ' + d.flow + '</span><br/>' + '<span>travel free time: ' + d.t0 + '</span><br/>' + '<span>capacity: ' + d.c + '</span>')
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px')
        })
        .on('mouseleave', (d, i) => {
          div.transition()
            .duration(500)
            .style('opacity', 0.0)
        })
      var node2 = svg2.selectAll('circle')
        .data(this.$store.state.nodes)
        .enter()
        .append('circle')
        .attr('r', 20)
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
      var text2 = svg2.selectAll('text')
        .data(this.$store.state.nodes)
        .enter()
        .append('text')
        .attr('x', (d) => { return d.x })
        .attr('y', (d) => { return d.y })
        .attr('text-anchor', 'middle')
        .style('fill', 'dimgray')
        .attr('dominant-baseline', 'middle')
        .text((d) => { return d.name })

      var ticked2 = () => {
        link2
          .attr('x1', (d) => { return d.source.x })
          .attr('y1', (d) => { return d.source.y })
          .attr('x2', (d) => { return d.target.x })
          .attr('y2', (d) => { return d.target.y })

        node2
          .attr('cx', (d) => { return d.x })
          .attr('cy', (d) => { return d.y })

        text2
          .attr('x', (d) => { return d.x })
          .attr('y', (d) => { return d.y })
      }
      d3.forceSimulation(this.$store.state.nodes)
        .force('link', d3.forceLink()
          .id((d) => { return d.id })
          .links(this.$store.state.links)
        )
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('end', ticked2)
    }
  },
  computed: {
    getNodes () {
      return this.$store.state.nodes
    },
    getLinks () {
      return this.$store.state.links
    },
    items () {
      return this.$store.state.items
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
