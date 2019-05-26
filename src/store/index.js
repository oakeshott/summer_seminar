import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  nodes: [
    {
      id: 1,
      name: 'A'
    },
    {
      id: 2,
      name: 'B'
    },
    {
      id: 3,
      name: 'C'
    },
    {
      id: 4,
      name: 'D'
    },
    {
      id: 5,
      name: 'E'
    },
    {
      id: 6,
      name: 'F'
    },
    {
      id: 7,
      name: 'G'
    },
    {
      id: 8,
      name: 'H'
    },
    {
      id: 9,
      name: 'I'
    },
    {
      id: 10,
      name: 'J'
    },
    {
      id: 11,
      name: 'K'
    },
    {
      id: 12,
      name: 'L'
    },
    {
      id: 13,
      name: 'M'
    },
    {
      id: 14,
      name: 'N'
    },
    {
      id: 15,
      name: 'O'
    },
    {
      id: 16,
      name: 'P'
    }
  ],
  links: [
    {
      id: 0,
      flow: 0,
      t0: 1,
      c: 4,
      source: 1,
      target: 2
    },
    {
      id: 1,
      flow: 0,
      t0: 1,
      c: 4,
      source: 2,
      target: 3
    },
    {
      id: 2,
      flow: 0,
      t0: 1,
      c: 4,
      source: 3,
      target: 4
    },

    {
      id: 3,
      flow: 0,
      t0: 1,
      c: 4,
      source: 5,
      target: 6
    },
    {
      id: 4,
      flow: 0,
      t0: 1,
      c: 4,
      source: 6,
      target: 7
    },
    {
      id: 5,
      flow: 0,
      t0: 1,
      c: 4,
      source: 7,
      target: 8
    },

    {
      id: 6,
      t0: 1,
      flow: 0,
      c: 4,
      source: 9,
      target: 10
    },
    {
      id: 7,
      flow: 0,
      t0: 1,
      c: 4,
      source: 10,
      target: 11
    },
    {
      id: 8,
      flow: 0,
      t0: 1,
      c: 4,
      source: 11,
      target: 12
    },

    {
      id: 9,
      flow: 0,
      t0: 1,
      c: 4,
      source: 13,
      target: 14
    },
    {
      id: 10,
      flow: 0,
      t0: 1,
      c: 4,
      source: 14,
      target: 15
    },
    {
      id: 11,
      t0: 1,
      flow: 0,
      c: 4,
      source: 15,
      target: 16
    },

    {
      id: 12,
      flow: 0,
      t0: 1,
      c: 4,
      source: 1,
      target: 5
    },
    {
      id: 13,
      flow: 0,
      t0: 1,
      c: 4,
      source: 5,
      target: 9
    },
    {
      id: 14,
      flow: 0,
      t0: 1,
      c: 4,
      source: 9,
      target: 13
    },

    {
      id: 15,
      flow: 0,
      t0: 1,
      c: 4,
      source: 2,
      target: 6
    },
    {
      id: 16,
      flow: 0,
      t0: 1,
      c: 4,
      source: 6,
      target: 10
    },
    {
      id: 17,
      flow: 0,
      t0: 1,
      c: 4,
      source: 10,
      target: 14
    },

    {
      id: 18,
      t0: 1,
      flow: 0,
      c: 4,
      source: 3,
      target: 7
    },
    {
      id: 19,
      t0: 1,
      flow: 0,
      c: 4,
      source: 7,
      target: 11
    },
    {
      id: 20,
      t0: 1,
      flow: 0,
      c: 4,
      source: 11,
      target: 15
    },

    {
      id: 21,
      t0: 1,
      flow: 0,
      c: 4,
      source: 4,
      target: 8
    },
    {
      id: 22,
      t0: 1,
      flow: 0,
      c: 4,
      source: 8,
      target: 12
    },
    {
      id: 23,
      t0: 1,
      flow: 0,
      c: 4,
      source: 12,
      target: 16
    }
  ],
  items: [
  ]
}
const getters = {
  getLinkById: (state) => (id) => {
    return state.links.find(link => link.id === id)
  },
  getNodeById: (state) => (id) => {
    return state.nodes.find(node => node.id === id)
  },
  getItems: (state) => {
    return state.items
  },
  getItemsSize: (state) => {
    return state.items.length
  },
  traveltime: (state) => (id) => {
    var l = state.links.find(link => link.id === id)
    var flow = l.flow
    var t0 = l.t0
    var c = l.c
    return t0 * (1 + 0.15 * (flow / c) ** 4)
  }
}
const mutations = {
  increment: (state, id) => {
    state.links.find(link => link.id === id).flow++
  },
  pushItem: (state, item) => {
    state.items.push(item)
  }
}

const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations
})
export default store
