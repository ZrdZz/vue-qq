<template>
  <div class="list" ref="outerWrapper">
    <ul>
      <li class="group" @click="openList(index)" v-for="(item, index) in data" :key="index"> 
        <i class="icon iconfont icon-xiangyoujiantou"></i> {{item.name}}
        <div class="childList" ref="innerWrapper" v-if="ifOpen(item, index)">
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
        if (this.outerScroll) {
          this.outerScroll.refresh()
        }
        if (this.innerScroll) {
          this.innerScroll.refresh()
        }
      },
      openList(index) {
        this['list' + index] = !this['list' + index]
      },
      ifOpen(item, index) {
        return item.childData && this['list' + index]
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.outerScroll = new BScroll(this.$refs.outerWrapper, {
          click: true
        })
        console.log(this.$refs.innerWrapper)
        if (this.$refs.innerWrapper) {
          this.innerScroll = new BScroll(this.$refs.innerWrapper, {
            click: true
          })
        }
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
    padding: 10px
    font-size: $fontsize-medium
    color: $color-grey
    background: $color-white
    .icon
      padding: 0 5px
    .childData
      height: 40px
      line-height: 40px
      font-size: $fontsize-large
      border-1px($color-light-grey)
      background : $color-white
</style>
