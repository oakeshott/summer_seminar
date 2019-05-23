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
        <td>{{ traveltime(props.item.route) }}</td>
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
          text: 'Travel time (totalflow)',
          value: 'name'
        },
        { text: 'Actions', value: 'name', sortable: false }
      ]
    }
  },
  methods: {
    traveltime (route) {
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
