<template>
  <div class="app-container">
    <component :is="ganttComponent" :data="data" :tree-props="data" :row-style="aa" :cell-style="bb" />

  </div>
</template>

<script>
import gantt from '@/components/Gantt/gantt.vue'
export default {
  components: {
    gantt
  },
  data() {
    return {
      ganttComponent: 'gantt',
      proStartDate: '',
      proEndDate: '',
      data: [{
        id: '1',
        pid: '0',
        data: ['2021-01-09', '2021-01-10'],
        name: '旅行',
        startDate: '2021-01-01',
        realStartDate: '2021-01-02',
        endDate: '2021-01-31',
        realEndDate: '2021-01-23',
        children: [{
          id: '1-1',
          pid: '1',
          name: '云台之间',
          startDate: '2021-01-03',
          realStartDate: '2021-01-04',
          endDate: '2021-01-06',
          realEndDate: '2021-01-07',
          children: [{
            id: '1-1-1',
            pid: '1-1',
            name: '日落云巅',
            startDate: '2019-09-10',
            endDate: '2019-09-13'
          }]
        },
        {
          id: '1-2',
          pid: '1',
          name: '天空之镜',
          startDate: '2019-09-17',
          endDate: '2019-09-22'
        },
        {
          id: '1-3',
          name: '蓬莱之岛',
          pid: '1',
          startDate: '2019-09-25',
          endDate: '2019-09-30'
        },
        {
          id: '1-4',
          pid: '1',
          name: '西塘之南',
          startDate: '2019-10-03',
          endDate: '2019-10-07'
        },
        {
          pid: '1',
          id: '1-5',
          name: '凤凰之缘',
          startDate: '2019-10-11',
          endDate: '2019-10-19'
        }
        ]
      },
      {
        id: '2',
        name: '租房子',
        startDate: '2019-09-20',
        endDate: '2019-10-31'
      }
      ], // 数据
      selected: [], // 选中数据
      contextMenuOptions: [{
        label: '任务名称',
        prop: 'name'
      },
      {
        label: '开始时间',
        prop: 'startDate'
      },
      {
        label: '结束时间',
        prop: 'endDate'
      }
      ],
      columns: [{
        type: 'name',
        minWidth: 200,
        colType: 'expand'
      }] // 可通过此参数配置列。其中内置有名称name、开始日期startDate、结束日期endDate、前置任务preTask，如果cloumns中有type等于这四个且slot为false时，将使用内置代码，当然除了内容使用内置代码，其他字段你还拥有配置权。另外如果不是为了配置内置列参数，slot中的prv和default仍可以用来自定义列
    }
  },
  methods: {
    aa({ row, rowIndex }) {
      console.log('aa:', row)
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    bb(row) {
      // console.log('bb:', row)
    },
    /**
       * 时间发生更改
       * row: Object 当前行数据c
       */
    timeChange(row) {
      console.log('时间修改:', row)
    },
    //
    /**
       * 前置任务发生更改
       * row: Object 当前行数据
       * oldval: [String, Array] 前置修改前的旧数据
       * handle: Boolean 是否用户编辑产生的改变
       */
    preChange(row, oldval, handle) {
      console.log('前置修改:', row, oldval, handle)
    },
    // 数表展开行
    expandChange(row, expanded) {
      console.log('展开行:', row, expanded)
    },
    // 多选选择
    selectionChange(/* val */) {
      // console.log("多选：", val);
    },
    // 删除任务
    taskRemove(item) {
      console.log('删除任务：', item)
    },
    // 添加任务
    taskAdd(item) {
      console.log('添加任务：', item)
      // 非懒加载方式直接设置子数据
      /* this.$set(
          item,
          "children",
          item.children.concat([
            {
              pid: item.id,
              id: "###",
              name: "一轮新月",
              startDate: "2019-10-11",
              endDate: "2019-10-19"
            }
          ])
        ); */
      this.$refs['wl-gantt-demo'].loadTreeAdd(item.id, [{
        pid: item.id,
        id: '###',
        name: '一轮新月',
        startDate: '2019-10-11',
        endDate: '2019-10-19'
      }])
    },
    // 懒加载
    lazyLoad(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([{
          id: '1-1-1',
          pid: tree.id,
          name: '日落云巅',
          startDate: '2019-09-10',
          endDate: '2019-09-13'
        }])
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
 .yhj-self{
   color: #ffa240;
   background: #ffa240;
 }
</style>

<style>
   .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
</style>
