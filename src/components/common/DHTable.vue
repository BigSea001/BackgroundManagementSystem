<template>
  <div>
  <el-table
    :data="dataSource"
    border
    style="width: 100%">
    <!--选择-->
    <el-table-column
      v-if="hasSelection"
      type="selection"
      fixed="left"
      width="55">
    </el-table-column>
    <!--序号-->
    <el-table-column
      v-if="hasIndex"
      type="index"
      label="序号"
      align="center"
      header-align="center"
      width="80">
    </el-table-column>

    <el-table-column v-if="hasImage" label="图片">
      <template scope="scope">
        <img :src="scope.row[imageUrl]" height="50px" align="center">
      </template>
    </el-table-column>
    <!--v-if="column.isShow"-->
    <el-table-column v-for="(column, index) in columns"
                     header-align="center"
                     :sortable="column.hasSort"
                     :prop="column.prop"
                     :label="column.label"
                     :key="column.prop"
                     width="120"
                     show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" width="200" header-align="center" align="center">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      imageUrl: {
        type: String
      },
      hasImage: {
        type: Boolean
      },
      hasSelection: {
        type: Boolean
      },
      hasIndex: {
        type: Boolean
      },
      columns: {
        type: Array
      },
      dataSource: {
        type: Array,
      }
    },
    data() {
      return {
      }
    },
    methods: {
      handleEdit(index,row) {
        this.$emit('editText',index,row);
      },
      handleDelete(index) {
        this.$emit('delete',index);
      }
    }
  }
</script>
