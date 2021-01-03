<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>

  </div>
</template>

<script>
  import {

  } from '@/api/project'
  export default {
    data() {
      return {
        tabPosition:"0"
      }
    },
    computed: {
      routesData() {
        return this.routes
      }
    },
    created() {
      this.orgId = this.$store.getters.orgId
      this.orgName = this.$store.getters.orgName
    },
    methods: {
      
    }
  }
</script>
<style lang="scss" scoped>
  .app-container {
    display: flex;
    background-color: aliceblue;
    height: calc(100vh - 84px);
    flex-direction: column;
    .container-header{
      display: flex;
      justify-content: space-between;
      padding: 20px;
      background-color: white;
      .lc-search-container {
          position: relative;
          width: 300px;
          padding: 0;
          float: left;
          .el-icon-search {
              position: absolute;
              top: 7px;
              left: 14px;
              color: #aaa;
              font-family: wtf !important;
              display: inline-block;
          }
          input {
              padding-left: 34px;
          }
      }
    }
    .project-body {
       height: 100%;
           padding: 20px;
      width: 100%;
      background-color: white;
      display: flex;
      border: 1px solid #eee;
      overflow-x: hidden;
      overflow-y: auto;
      .el-row {
          position: relative;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 100%;
          overflow: auto;
          .el-col{
            padding-top: 10px;
          }
      }
      .yhj-task-card-text{
        padding: 14px;
        .yhj-card-row{
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          .yhj-card-span{
            margin-left: 4px;
            color: cadetblue;
            border-left: 2px solid cadetblue;
            padding-left: 4px;
          }
          .yhj-card-span:first-child{
            margin-left: 0px;
          }
          .yhj-card-span-v{
            margin-left: 4px;
            display: flex;
            i{
              width: 18px;
              background-color: #ca5858;
              height: 18px;
              display: inline-block;
              border-radius: 50%;
              box-shadow: 0 0 6px 2px #ca5858;
              border: none;
              margin-right: 10px;
            }
          }
        }

      }
      .svg-icon{
          width: 2em;
          height: 2em;
      }
      .image {
        width: 100%;
        display: block;
        height: 200px;
      }

    }
  }



  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    display: flex;
    justify-content: right;
    align-items: center;

    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }



  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }


</style>
<style>
  .yhj-el-radio-group {
      margin: 0px !important;
  }

</style>
