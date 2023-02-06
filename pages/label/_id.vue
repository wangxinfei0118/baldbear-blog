<template>
  <div>
    <page-header bgName="label-header" :title="$route.query.name"></page-header>
    <div style="width: 100%">
      <div class="note-box">
        <note-list :page="page" :list-data="noteList" @fetch-data="fetchData"></note-list>
      </div>
    </div>
  </div>
</template>
<script>
import NoteList from '@/components/note/List'
import PageHeader from '@/components/common/PageHeader'
export default {
  components: {
    NoteList,
    PageHeader
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  methods: {
    async fetchData(current) {
      this.page.current = current
      const queryObj = { ...this.page, label: this.$route.query.name }
      const res = await this.$getNoteList(queryObj)
      this.page.total = res.data.total
      this.noteList = res.data.records
    }
  },
  async asyncData({ app, query }) {
    const page = { current: 1, size: 8 }
    const queryObj = { ...page, label: query.name }
    const { data } = await app.$getNoteList(queryObj)
    page.total = data.total
    return { page, noteList: data.records }
  }
}
</script>
<style scoped>
.note-box {
  width: 60%;
  @apply mb-4 mx-auto;
}
@media only screen and (max-width: 992px) {
  .note-box {
    width: 100%;
    @apply mb-4 mx-auto;
  }
}
</style>
