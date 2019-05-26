<template>
  <div id="result">
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.route }}</td>
        <td>{{ totalFlow(props.item.route) }}</td>
        <td>{{ totalTraveltime(props.item.route) }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            >
            edit
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <v-data-table
      :headers="headers_for_links"
      :items="links"
      class="elevation-1"
      >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.flow }}</td>
        <td>{{ traveltime(props.item.id) }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {
      headers_for_links: [
        {
          text: 'Link id',
          align: 'left',
          value: 'id'
        },
        {
          text: 'Flow',
          value: 'flow'
        },
        {
          text: 'Travel time',
          value: 'name'
        }
      ],
      headers: [
        {
          text: 'Route id',
          align: 'left',
          value: 'id'
        },
        {
          text: 'Route',
          value: 'route'
        },
        {
          text: 'Travel flow',
          value: 'name'
        },
        {
          text: 'Travel time',
          value: 'name',
          sortable: true
        },
        { text: 'Actions', value: 'name', sortable: false }
      ]
    }
  },
  methods: {
    traveltime (id) {
      return this.$store.getters.traveltime(id)
    },
    totalTraveltime (route) {
      var t = 0
      for (let l of route) {
        t += parseFloat(this.$store.getters.traveltime(l))
      }
      return t
    },
    totalFlow (route) {
      var f = 0
      for (let l of route) {
        f += parseInt(this.$store.getters.getLinkById(l).flow)
      }
      return f
    }
  },
  computed: {
    nodes () {
      return this.$store.state.nodes
    },
    links () {
      return this.$store.state.links
    },
    items () {
      return this.$store.state.items
    }
  }
}
</script>
