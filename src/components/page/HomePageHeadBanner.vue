<!--suppress ALL -->
<template>
  <div>
    <el-button type="primary" @click="addBanner">添加</el-button>
    <dh_table @delete="deltet" @editText="editText" :columns="columns" :dataSource="tableData" :hasImage="hasImage"
              :imageUrl="imageUrl"></dh_table>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible" :before-close="beforeClose">
      <edit_text_banner :bannerData="bannerData" @cancel="cancel"></edit_text_banner>
    </el-dialog>
  </div>

</template>

<script>
  import DHTable from '../common/DHTable.vue';
  import EditTextBanner from '../page/EditTextBanner.vue';
  export default {
    components: {
      dh_table: DHTable,
      edit_text_banner: EditTextBanner
    },
    created () {
      console.log('创建完');
      this.initData();
    },
    data() {
      return {
        hasImage: true,
        imageUrl: 'adCode',
        dialogFormVisible: false,
        columns: [{
          prop: 'adLink',   //<String>  对应属性名
          label: '跳转地址',  //<String>   表头标签
        }, {
          prop: 'createDataString',   //<String>  对应属性名
          label: '创建时间',  //<String>   表头标签
        }, {
          prop: 'skipMode',   //<String>  对应属性名
          label: '跳转方式',  //<String>   表头标签
        }, {
          prop: 'type',   //<String>  对应属性名
          label: '跳转界面',  //<String>   表头标签
        }],
        tableData: [],
        bannerData: {},
        times: 0
      }
    },
    methods: {
      initData () {
        this.$http({
          method: 'GET',
          url: 'http://192.168.1.103:8085/dahai/getBannerByType',
          params: {
            type: 'home'
          }
        }).then(response => {
          if (response.body.error === '0') {
            this.tableData = response.body.resultData;
          } else {
            this.$message.error(response.body.msg);
          }
        }, error => {
          this.$message.error('网络有问题!');
        });
      },
      addBanner () {
        this.bannerData = {};
        this.dialogFormVisible = true;
      },
      editText (index,row) {
        this.bannerData = row;
        this.bannerData.skipMode = row.skipMode.toString();
        this.dialogFormVisible = true;
      },
      deltet (index) {
        const id = this.tableData[index].id;
        this.$http({
          method: 'GET',
          url: 'http://192.168.1.103:8085/dahai/deleteBanner',
          params: {
            id: id
          }
        }).then(response => {
          if (response.body.error === '0') {
            this.$message.success('删除成功');
            const len = this.tableData.length;
            for (let i = 0; i < len; i++) {
              if (this.tableData[i].id === rowData.id) {
                this.tableData.splice(i, 1);
                break;
              }
            }
          } else {
            this.$message.error(response.body.msg);
          }
        }, error => {
          this.$message.error('网络有问题!');
        });
      },
      cancel (item) {
          console.log('传回来', item);
          console.log('原来的数据', this.tableData);
      },
      beforeClose () {
        this.bannerData = {};
        this.dialogFormVisible = false
      }
    },
    watch: {
      bannerData (newVal, oldVal) {
        console.log('bannerData==>'+newVal,oldVal)
      },
      tableData (newVal, oldVal) {
        console.log('tableData'+newVal,oldVal)
      }
    }
  }
</script>
