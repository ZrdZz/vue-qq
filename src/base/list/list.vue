<template>
  <div class="list" ref="wrapper">
    <ul>
      <li class="group" @click="openList(index, $event)" v-for="(item, index) in data" :key="index">
        <span class="groupTitle"> <i class="icon iconfont icon-xiangyoujiantou"></i>{{item.name}} </span> 
        <div class="childList" v-if="ifOpen(item, index)">
          <ul>
            <li class="childData border-1px" v-for="(item, index) in item.childData" :key="index"> 
              <img />
              {{item.name}} 
            </li>
          </ul> 
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    data() {
      let obj = {}
      this.data.forEach((item, index) => {
        obj['list' + index] = false
      })
      return obj
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      refresh() {
        if (this.wrapper) {
          this.wrapper.refresh()
        }
      },
      openList(index, event) {
        this['list' + index] = !this['list' + index]
        if (this['list' + index]) {
          event.target.firstChild.style.transform = 'rotate(90deg)'
        } else {
          event.target.firstChild.style.transform = 'rotate(0deg)'
        }
      },
      ifOpen(item, index) {
        return item.childData && this['list' + index]
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      })
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .group
    width: 100%
    font-size: $fontsize-medium
    color: $color-grey
    background: $color-white
    .groupTitle
      display: block
      width: 100%
      height: 100%
      padding: 5px 0
    .icon
      display: inline-block
      padding: 0 5px
    .childData
      height: 40px
      line-height: 40px
      font-size: $fontsize-large
      border-1px($color-light-grey)
      background : $color-white
</style>
