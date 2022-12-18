<template>

  <el-row>
    <el-col :span="8" style="padding-right :10px ">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user.png" alt="">
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2021-7-19</span></p>
            <p>上次登录地点：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card style="margin-top:20px; height: 460px;">
            <el-table
              :data="tableData"
              style="width: 100%">
              <!-- <el-table-column
                prop="name"
                label="课程">
              </el-table-column>
              <el-table-column
                prop="todayBuy"
                label="今日购买">
              </el-table-column>
              <el-table-column
                prop="monthBuy"
                label="本月购买">
              </el-table-column>
              <el-table-column
                prop="totalBuy"
                label="总购买">
              </el-table-column> -->
            <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" :key="key" />
            </el-table>          
        </el-card>
    </el-col>
    <el-card :span="16" style="padding-left: 10px ">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display:'flex',padding:0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style=" { background: item.color }"></i>
          <div class="detail">
            <p class="price">{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <!-- 折线图 -->
        <dir ref="echarts1" style="height:280px"></dir>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div ref="echarts2" style="height:260px">
          </div>
        </el-card>
        <el-card style="height:260px">
          <div ref="echarts3" style="height:240px">

          </div>
        </el-card>
      </div>
    </el-card>

  </el-row>

</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
  data(){
    return {
      tableData :[
/*        {
            name: 'oppo',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: 'vivo',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '苹果',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '小米',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '三星',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '魅族',
           todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          } */
        ],
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'共购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],


      
    }
  },
  mounted(){
    getData().then(( { data } ) => {
      console.log(data)
      console.log(data.data)
      const { tableData } = data.data
      this.tableData = tableData
    // 基于准备好的dom,初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
    // 指定图表的配置项和数据
      const echarts1option = {}
    // 处理数据xAxis
      const { orderData,userData,videoData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data:xAxis
      }
      const xAxisDate = {
        data:orderData.date
      }
      echarts1option.xAxis = xAxisDate
      echarts1option.legend = xAxisData
      echarts1option.series = []
      echarts1option.yAxis = {}
      xAxis.forEach(key => {
        echarts1option.series.push({
          name:key,
          data:orderData.data.map(item => item[key]),
          type:'line'
        })
      })
      console.log(echarts1option)
      // 使用刚指定的配置项和数据显示图表
      echarts1.setOption(echarts1option)


      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2option = {
            legend: {
              // 图例文字颜色
              textStyle: {
                color: "#333",
              },
            },
            grid: {
              left: "20%",
            },
            // 提示框
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              type: "category", // 类目轴
              data: userData.map(item => item.date),
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
              axisLabel: {
                interval: 0,
                color: "#333",
              },
            },
            yAxis: [
              {
                type: "value",
                axisLine: {
                  lineStyle: {
                    color: "#17b3a3",
                  },
                },
              },
            ],
            color: ["#2ec7c9", "#b6a2de"],
            series: [
              {
                name:'新增用户',
                data:userData.map(item => item.new),
                type:'bar'
              },
              {
                name:'活跃用户',
                data:userData.map(item => item.active),
                type:'bar'
              }
            ]
        }
      echarts2.setOption(echarts2option)

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3option = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data:videoData,
              type:'pie'
            }
          ],
        }
        echarts3.setOption(echarts3option)

    })
  }
}
</script>

<style lang="less" scoped>
  .user {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    img {
      margin-right: 40px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
  .login-info {
      p {
        line-height: 28px;
        font-size: 14px;
        color:#999;
        span {
          color:#666;
          margin-left: 60px;
        }
      }
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access {
        color: #999;
      }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #ccc;
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
      .price {
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 30px;
        height: 30px;
      }
      .desc {
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
      margin-top: 20px;
    }
  }
</style>