<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index ) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain' "
      @click="changeMenu(item)"
      @close="handleClose(item,index)"
      size="small"
      >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name:'CommonTag', 
  data(){
    return {}
  },
  computed:{
    ...mapState({        //因为传过来的tabsList 是一个对象 所以要加...解析
      tags: state => state.tab.tabsList  // 参数传递 通过mapState将tags赋值
    })
  },
  
  mounted(){
    console.log(this.$route.name,this.tags)
  },
  methods:{
    // 这个也是调用解析的一种 将store中的mutatio传进来 也是一个对象
    ...mapMutations(['closeTag']),   
    // 点击tag跳转的功能
    changeMenu(item) {
      this.$router.push( {name:item.name} )
    },
    //点击tag删除的功能
    handleClose(item,index) {
      // 调用store中的mutation 进行数据的删除
      this.closeTag(item)
      const length = this.tags.length
      // 删除之后的跳转逻辑
      if( item.name !== this.$route.name ){
        
      }
      // 表示是删除的最后一项
      if( index === length ) {
        this.$router.push({
          name: this.tags[index-1].name
          // name: this.tags[index].name
        })
      }else{
        this.$router.push({
          name: this.tags[index].name
        })
      }
      
    },
  }
}
</script>

<style lang="less" scoped>
  .tabs {
    padding: 20px;
    .el-tag {
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>>

