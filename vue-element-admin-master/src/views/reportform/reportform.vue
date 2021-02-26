<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Excel
      </el-button>
      <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <el-table v-loading="listLoading" :data="dataMap.list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="行业类别" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.categoryName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="对接时间" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="牵头单位" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="牵头领导" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="协调负责人" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="协调负责人" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="协调负责人" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="协调负责人" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
        </template>
      </el-table-column>
      able-column label="Readings" width="115" align="center">
      <template slot-scope="scope">
        {{ scope.row.pageviews }}
      </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="dataMap.pn"
      :page-sizes="[20, 50, 100]"
      :page-size="dataMap.ps"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataMap.total"
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
    />
  </div>
</template>

<script>
import { getProjectForm } from '@/api/reportform.js'
import { parseTime } from '@/utils'
// options components
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      search: '',
      searchStatus: '',
      dataMap: {
        'pn': 1,
        'ps': 20,
        'list': [],
        'total': 0
      }
    }
  },
  created() {
    this.orgId = this.$store.getters.orgId
    this.fetchData(1, 20)
  },
  methods: {
    async handlePageSizeChange(val) {
      this.fetchData(this.dataMap.pn, val)
    },
    async handlePageCurrentChange(val) {
      this.fetchData(val, this.dataMap.ps)
    },
    async fetchData(pn, ps) {
      this.listLoading = true
      const res = await getProjectForm(pn, ps, this.orgId, this.search, this.searchStatus)
      console.log('数据：', res)
      this.dataMap = res.data.list
      this.listLoading = false
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
