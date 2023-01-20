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
      const query = { ...this.page, labelId: this.$route.params.id }
      const res = await this.$getNoteList(query)
      this.page.total = res.data.total
      this.noteList = res.data.records
    }
  },
  async asyncData({ app, params }) {
    const page = {
      total: 0,
      current: 1,
      size: 20
    }
    const query = { ...page, labelId: params.id }
    const { data } = await app.$getNoteList(query)
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
