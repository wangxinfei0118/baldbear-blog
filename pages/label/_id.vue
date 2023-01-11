<template>
  <div>
    <div class="head">
      <div class="background w-full flex flex-col items-center">
        <div class="bg-img"></div>
        <div class="head-card">
          <div class="title -mt-6" style="font-size: 32px">
            {{ $route.query.name }}
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%">
      <div class="note-box">
        <note-list :page="page" :list-data="noteList" @fetch-data="fetchData"></note-list>
      </div>
    </div>
  </div>
</template>
<script>
import NoteList from '@/components/note/List'

export default {
  components: {
    NoteList
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
.bg-img {
  width: 100%;
  height: 350px;
  background-image: url('assets/img/label-header.jpg');
  background-size: cover;
}
.head-card {
  width: 60%;
  height: 180px;
  box-sizing: border-box;
  padding: 24px 24px 0;
  color: #fff;
  background-color: hsla(0, 0%, 100%, 0.5);
  border: 1px solid #f0f0f0;
  margin-top: -180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
