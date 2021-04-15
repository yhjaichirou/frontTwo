<template>
  <div class="app-container">
    <div class="container-header">

      <el-tabs v-model="tabChangeValue" @tab-click="handleTabChange">
        <el-tab-pane label="全市重点对接企业项目推进台账">
          <div>
            <FilenameOption v-model="search" />
            <AutoWidthOption v-model="searchStatus" />
            <el-button style="margin:0 0 20px 20px;" type="primary" icon="el-icon-search" @click="handleSearch">
              搜索
            </el-button>
            <BookTypeOption v-model="bookType" />
            <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
              导出excel
            </el-button>
            <!-- <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
                  <el-tag type="info">Documentation</el-tag>
                </a> -->
          </div>

          <el-table v-loading="listLoading" :data="dataMap.list" element-loading-text="Loading..." border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">
                {{ scope.$index +1 }}
              </template>
            </el-table-column>
            <el-table-column label="项目编码">
              <template slot-scope="scope">
                {{ scope.row.number }}
              </template>
            </el-table-column>
            <el-table-column label="项目名称">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="行业类别" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.categoryName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="投资规模(亿元)" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.invest }}￥</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="项目内容" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.content }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="对接时间" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="牵头单位" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.leadenterName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="牵头领导" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.leaderName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="配合部门" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.orgName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="项目推进阶段" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :style="{'color':(scope.row.status == 7?'red':scope.row.status == 1?'green':scope.row.status == 2?'#666':'blue' )}">{{ scope.row.statusStr }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="项目进展情况" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.processCondition }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="手续办理情况" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.earlyStage }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="存在的需要解决的问题" width="115" align="center">
              <template slot-scope="scope">
                {{ scope.row.diffAndProblem }}
              </template>
            </el-table-column>

            <el-table-column label="企业联系人及电话" width="115" align="center">
              <template slot-scope="scope">
                {{ scope.row.enterManagerName }} - {{ scope.row.enterManagerMobile }}
              </template>
            </el-table-column>
            <el-table-column label="备注" width="115" align="center">
              <template slot-scope="scope">
                {{ scope.row.remarks }}
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

        </el-tab-pane>
        <el-tab-pane label="政府投资5000万元以上、企业投资亿元以上项目">

          <div>
            <FilenameOption v-model="search" />
            <AutoWidthOption v-model="searchStatus" />
            <el-button style="margin:0 0 20px 20px;" type="primary" icon="el-icon-search" @click="handleSearch">
              搜索
            </el-button>
            <BookTypeOption v-model="bookType" />
            <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
              导出excel
            </el-button>
            <!-- <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
                <el-tag type="info">Documentation</el-tag>
              </a> -->
          </div>

          <el-table v-loading="listLoading2" :data="dataMap2.list" element-loading-text="Loading..." border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">
                {{ scope.$index +1 }}
              </template>
            </el-table-column>
            <el-table-column label="项目编码">
              <template slot-scope="scope">
                {{ scope.row.number }}
              </template>
            </el-table-column>
            <el-table-column label="项目名称">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="行业类别" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.categoryName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="投资规模(亿元)" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.invest }}￥</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="项目内容" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.content }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="对接时间" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.dockingDateStr }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="牵头单位" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.leadenterName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="牵头领导" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.leaderName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="配合部门" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.orgName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="项目推进阶段" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :style="{'color':(scope.row.status == 7?'red':scope.row.status == 1?'green':scope.row.status == 2?'#666':'blue' )}">{{ scope.row.statusStr }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="项目进展情况" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.processCondition }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="手续办理情况" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.earlyStage }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="存在的需要解决的问题" width="115" align="center">
              <template slot-scope="scope">
                {{ scope.row.diffAndProblem }}
              </template>
            </el-table-column>

            <el-table-column label="企业联系人及电话" width="115" align="center">
              <template slot-scope="scope">
                {{ scope.row.enterManagerName }} - {{ scope.row.enterManagerMobile }}
              </template>
            </el-table-column>
            <el-table-column label="备注" width="115" align="center">
              <template slot-scope="scope">
                {{ scope.row.remarks }}
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
            :current-page="dataMap2.pn"
            :page-sizes="[20, 50, 100]"
            :page-size="dataMap2.ps"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataMap2.total"
            @size-change="handlePageSizeChange2"
            @current-change="handlePageCurrentChange2"
          />

        </el-tab-pane>
      </el-tabs>

    </div>

  </div>
</template>

<script>
import { getProjectForm } from '@/api/reportform.js'
import { parseTime } from '@/utils'
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      tabChangeValue: '0',
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      bookType: 'xlsx',
      search: '',
      searchStatus: '',
      dataMap: {
        'pn': 1,
        'ps': 20,
        'list': [],
        'total': 0
      },

      list2: null,
      listLoading2: true,
      downloadLoading2: false,
      filename2: '',
      bookType2: 'xlsx',
      search2: '',
      searchStatus2: '',
      dataMap2: {
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
    async handleTabChange(v) {
      if (this.tabChangeValue === 0) {
        this.fetchData(1, 20)
      } else if (this.tabChangeValue === 1) {
        this.fetchData2(1, 20)
      }
    },
    async handlePageSizeChange(val) {
      this.fetchData(this.dataMap.pn, val)
    },
    async handlePageCurrentChange(val) {
      this.fetchData(val, this.dataMap.ps)
    },
    async handleSearch() {
      this.listLoading = true
      const res = await getProjectForm(this.dataMap.pn, this.dataMap.ps, this.orgId, this.search, this.searchStatus)
      console.log('数据：', res.data)
      this.dataMap = res.data
      this.listLoading = false
    },
    async fetchData(pn, ps) {
      this.listLoading = true
      const res = await getProjectForm(pn, ps, this.orgId, this.search, this.searchStatus)
      console.log('数据：', res.data)
      this.dataMap = res.data
      this.listLoading = false
    },
    async handleSearch2() {
      this.listLoading = true
      const res = await getProjectForm(this.dataMap.pn, this.dataMap.ps, this.orgId, this.search, this.searchStatus)
      this.dataMap = res.data
      this.listLoading = false
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['项目编号', '项目名称', '行业类别', '投资规模(亿元)', '项目内容', '对接时间', '牵头单位', '牵头领导', '配合部门',
          '项目推进阶段', '手续办理情况', '存在的需要解决的问题', '预计完成时间', '企业联系人', '企业联系人电话', '备注']
        const filterVal = ['number', 'name', 'categoryName', 'invest', 'content', 'dockingDateStr', 'leadenterName', 'leaderName',
          'orgName', 'processCondition', 'earlyStage', 'diffAndProblem', 'expectedDateStr', 'enterManagerName', 'enterManagerMobile', 'remarks']
        const list = this.dataMap.list
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
    },
    async fetchData2(pn, ps) {
      this.listLoading = true
      const res = await getProjectForm(pn, ps, this.orgId, this.search, this.searchStatus)
      console.log('数据：', res.data)
      this.dataMap = res.data
      this.listLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>

  .app-container {
    display: flex;
    background-color: aliceblue;
    height: calc(100vh - 84px);
    flex-direction: column;

    .container-header {
      padding: 0px 20px 20px 20px;
      background-color: white;
      height: 100%;
    }
    ::v-deep .el-tabs__content{
      margin: 20px 0px;
      padding: 0px !important;
    }
  }
</style>
<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
