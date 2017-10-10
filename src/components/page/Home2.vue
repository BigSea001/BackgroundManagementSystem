<!--第二个头的数据-->
<!--suppress ALL -->
<template>
  <div>

    <el-button type="primary" @click="addData">添加</el-button>

    <dh_table @delete="deltet" @editText="editText" :hasIndex="hasIndex" :hasSelection="hasSelection" :columns="columns" :dataSource="dataSource" :hasImage="hasImage"
              :imageUrl="imageUrl"></dh_table>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址" prop="linkUrl">
          <el-input v-model="ruleForm.linkUrl"></el-input>
        </el-form-item>
        <el-form-item label="内容分类" prop="type">
          <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
        <el-form-item label="跳转方式" prop="skipModel">
          <el-radio-group v-model="ruleForm.skipModel">
            <el-radio :label="0">本地</el-radio>
            <el-radio :label="1">web</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示图片" prop="img">
          <el-input type="textarea" v-model="ruleForm.img"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import DHTable from '../common/DHTable.vue';
  export default {
    created() {
      this.initData();
    },
    components: {
      dh_table: DHTable
    },
    data () {
      return {
        imageUrl: 'img',
        hasImage: true,
        hasSelection: false,
        hasIndex: true,
        isAddData: false,
        columns: [
          {
            hasSort: false,  //<Boolean> 是否排序
            isShow: true,  //<Boolean> 是否展示
            prop: 'title',   //<String>  对应属性名
            label: '标题',  //<String>   表头标签
          },
          {
            hasSort: false,  //<Boolean> 是否排序
            isShow: true,  //<Boolean> 是否展示
            prop: 'linkUrl',   //<String>  对应属性名
            label: '跳转地址',  //<String>   表头标签
          },
          {
            hasSort: false,  //<Boolean> 是否排序
            isShow: true,  //<Boolean> 是否展示
            prop: 'skipModel',   //<String>  对应属性名
            label: '跳转方式',  //<String>   表头标签
          },
          {
            hasSort: false,  //<Boolean> 是否排序
            isShow: true,  //<Boolean> 是否展示
            prop: 'type',    //<String>  对应属性名
            label: '内容分类', //<String>   表头标签
          }],
        dataSource: [],
        ruleForm:{},
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          linkUrl: [
            { required: true, message: '请输入跳转地址', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请输入图片地址', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请输入内容分类', trigger: 'blur' }
          ]
        },
        dialogFormVisible: false
      }
    },
    methods: {
      initData() {
        this.$http({
          method: 'GET',
          url: 'http://192.168.1.103:8085/dahai/getIconLogo'
        }).then(response => {
          if (response.body.error === '0') {
            this.dataSource = response.body.resultData;
          } else {
            this.$message.error(response.body.msg);
          }
        }, error => {
          this.$message.error('网络有问题!');
        });
      },
      editText (index) {
          this.ruleForm = this.dataSource[index];
        this.isAddData = false;
          this.dialogFormVisible = true;
      },
      deltet (index) {
        const id = this.dataSource[index].id;

        this.$http({
          method: 'GET',
          url: 'http://192.168.1.103:8085/dahai/deleteIconLogo',
          params: {
            id: id
          }
        }).then(response => {
          if (response.body.error === '0') {
            this.$message.success('删除成功');
            this.dataSource.splice(index, 1)
          } else {
            this.$message.error(response.body.msg);
          }
        }, error => {
          this.$message.error('网络有问题!');
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            this.$http({
              method: 'POST',
              url: 'http://192.168.1.103:8085/dahai/addOrEditIconLogo',
              body: {
                id: _this.ruleForm.id,
                title: _this.ruleForm.title,
                linkUrl: _this.ruleForm.linkUrl,
                img: _this.ruleForm.img,
                skipModel: _this.ruleForm.skipModel,
                type: _this.ruleForm.type
              }
            }).then(response => {
              if (response.body.error === '0') {
                if (this.isAddData) {
                  _this.$message.success('添加成功');
                  _this.dataSource.push(response.body.resultData)
                } else {
                  const len = _this.dataSource.length;
                  for (let i = 0; i < len; i ++) {
                    if (_this.dataSource[i].id === _this.ruleForm.id) {
                      _this.$message.success('修改成功');
                      _this.set(_this.dataSource,i,_this.ruleForm);
                      break;
                    }
                  }
                }
                _this.dialogFormVisible = false;
              } else {
                this.$message.error(response.body.msg);
              }
            }, error => {
              this.$message.error('网络有问题!');
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addData() {
        this.ruleForm = {};
        this.ruleForm.skipModel = 0;
        this.isAddData = true;
        this.dialogFormVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
