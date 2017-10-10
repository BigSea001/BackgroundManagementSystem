<template>
  <el-form :model="bannerData" :rules="rules" ref="ruleForm">
    <el-form-item label="跳转地址" prop="adLink" :label-width="formLabelWidth">
      <el-input v-model="bannerData.adLink" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="图片地址" prop="adCode" :label-width="formLabelWidth">
      <el-input v-model="bannerData.adCode" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="跳转方式" :label-width="formLabelWidth">
      <el-radio class="radio" v-model="bannerData.skipMode" label="0">本地跳转</el-radio>
      <el-radio class="radio" v-model="bannerData.skipMode" label="1">跳转到web</el-radio>
    </el-form-item>
    <el-form-item label="广告显示地方" prop="type" :label-width="formLabelWidth">
      <el-input v-model="bannerData.type" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="clickSure('ruleForm')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: ['bannerData'],
    data () {
      return {
        formLabelWidth: '120px',
        rules: {
          adLink: [
            {required: true, message: '请输入跳转地址', trigger: 'blur'}
          ],
          adCode: [
            {required: true, message: '请输入图片地址', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入显示界面', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      clickSure (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            this.$http({
              method: 'POST',
              url: 'http://192.168.1.103:8085/dahai/addOrEditBanner',
              body: {
                id: _this.bannerData.id,
                adLink: _this.bannerData.adLink,
                adCode: _this.bannerData.adCode,
                skipMode: _this.bannerData.skipMode,
                type: _this.bannerData.type
              }
            }).then(response => {
              if (response.body.error === '0') {
                this.$message.success('修改成功');
//                成功回调
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
      cancel() {
        console.log(this.bannerData);
        this.form = {};
        this.$emit('cancel',this.bannerData);
      }
    }
  }
</script>
